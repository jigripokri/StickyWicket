import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { projects, pageViews } from "@db/schema";
import { desc, sql } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Track page views
  app.use(async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }

    await db.insert(pageViews).values({
      path: req.path,
      userAgent: req.headers["user-agent"] || null,
    });
    next();
  });

  // Get all projects
  app.get("/api/projects", async (_req, res) => {
    const allProjects = await db.select().from(projects);
    res.json(allProjects);
  });

  // Get analytics data
  app.get("/api/analytics", async (_req, res) => {
    const [
      totalVisitors,
      pageViewsCount,
      viewsOverTime,
    ] = await Promise.all([
      db
        .select({ count: sql<number>`count(distinct user_agent)` })
        .from(pageViews)
        .then(result => result[0].count),
      db
        .select({ count: sql<number>`count(*)` })
        .from(pageViews)
        .then(result => result[0].count),
      db
        .select({
          date: sql<string>`date_trunc('day', timestamp)::text`,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .groupBy(sql`date_trunc('day', timestamp)`)
        .orderBy(sql`date_trunc('day', timestamp)`)
        .limit(30),
    ]);

    res.json({
      totalVisitors,
      pageViews: pageViewsCount,
      avgTimeOnSite: "2:30", // Placeholder - would need session tracking for real value
      viewsOverTime,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
