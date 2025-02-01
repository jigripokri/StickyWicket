import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { pageViews, projectClicks, projects } from "@db/schema";
import { sql } from "drizzle-orm";
import { eq, and } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Track page views with enhanced data
  app.use(async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }

    await db.insert(pageViews).values({
      path: req.path,
      userAgent: req.headers["user-agent"] || null,
      ipAddress: req.ip,
      referrer: req.headers["referer"] || null,
      // Note: In a production environment, you'd want to use a geolocation service
      // to populate country and city based on IP address
      country: null,
      city: null,
    });
    next();
  });

  // Track project clicks
  app.post("/api/track-click/:projectId", async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    await db.insert(projectClicks).values({
      projectId,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });
    res.json({ success: true });
  });

  // Get enhanced analytics data
  app.get("/api/analytics", async (_req, res) => {
    const [
      totalVisitors,
      pageViewsCount,
      viewsByHour,
      viewsByDay,
      topProjects,
      topCountries,
    ] = await Promise.all([
      db
        .select({ count: sql<number>`count(distinct ip_address)` })
        .from(pageViews)
        .then(result => result[0].count),
      db
        .select({ count: sql<number>`count(*)` })
        .from(pageViews)
        .then(result => result[0].count),
      // Hourly views for the last 24 hours
      db
        .select({
          hour: sql<string>`date_trunc('hour', timestamp)::text`,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .where(sql`timestamp > now() - interval '24 hours'`)
        .groupBy(sql`date_trunc('hour', timestamp)`)
        .orderBy(sql`date_trunc('hour', timestamp)`),
      // Daily views for the last 30 days
      db
        .select({
          date: sql<string>`date_trunc('day', timestamp)::text`,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .where(sql`timestamp > now() - interval '30 days'`)
        .groupBy(sql`date_trunc('day', timestamp)`)
        .orderBy(sql`date_trunc('day', timestamp)`),
      // Top clicked projects
      db
        .select({
          projectId: projectClicks.projectId,
          title: projects.title,
          clicks: sql<number>`count(*)`,
        })
        .from(projectClicks)
        .leftJoin(projects, eq(projects.id, projectClicks.projectId))
        .groupBy(projectClicks.projectId, projects.title)
        .orderBy(sql`count(*) desc`)
        .limit(5),
      // Top countries (when implemented with geolocation service)
      db
        .select({
          country: pageViews.country,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .where(sql`country is not null`)
        .groupBy(pageViews.country)
        .orderBy(sql`count(*) desc`)
        .limit(5),
    ]);

    res.json({
      totalVisitors,
      pageViews: pageViewsCount,
      avgTimeOnSite: "2:30", // Placeholder - would need session tracking for real value
      viewsByHour,
      viewsByDay,
      topProjects,
      topCountries,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}