import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { pageViews, projectClicks, projects } from "@db/schema";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

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
      avgTimeOnSite,
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
      // Calculate real average time on site
      db
        .execute<{ avg_time: string }>(sql`
          WITH user_sessions AS (
            SELECT 
              ip_address,
              timestamp,
              LEAD(timestamp) OVER (PARTITION BY ip_address ORDER BY timestamp) as next_timestamp
            FROM page_views
            WHERE timestamp > NOW() - INTERVAL '7 days'
          ),
          session_durations AS (
            SELECT 
              EXTRACT(EPOCH FROM (next_timestamp - timestamp)) as duration_seconds
            FROM user_sessions
            WHERE 
              next_timestamp IS NOT NULL 
              AND (next_timestamp - timestamp) < INTERVAL '30 minutes'
          )
          SELECT 
            CONCAT(
              FLOOR(AVG(duration_seconds) / 60)::text, 
              ':', 
              LPAD(FLOOR(MOD(AVG(duration_seconds), 60))::text, 2, '0')
            ) as avg_time
          FROM session_durations
        `)
        .then(result => result[0]?.avg_time || '0:00'),
      // Daily views for the last 7 days
      db
        .select({
          date: sql<string>`date_trunc('day', timestamp)::text`,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .where(sql`timestamp > NOW() - INTERVAL '7 days'`)
        .groupBy(sql`date_trunc('day', timestamp)`)
        .orderBy(sql`date_trunc('day', timestamp)`),
      // Top clicked projects with titles
      db
        .select({
          projectId: projectClicks.projectId,
          title: projects.title,
          clicks: sql<number>`count(*)`,
        })
        .from(projectClicks)
        .leftJoin(projects, eq(projects.id, projectClicks.projectId))
        .where(sql`project_clicks.timestamp > NOW() - INTERVAL '7 days'`)
        .groupBy(projectClicks.projectId, projects.title)
        .orderBy(sql`count(*) desc`)
        .limit(5),
      // Top countries
      db
        .select({
          country: pageViews.country,
          views: sql<number>`count(*)`,
        })
        .from(pageViews)
        .where(sql`timestamp > NOW() - INTERVAL '7 days' AND country is not null`)
        .groupBy(pageViews.country)
        .orderBy(sql`count(*) desc`)
        .limit(5),
    ]);

    res.json({
      totalVisitors,
      pageViews: pageViewsCount,
      avgTimeOnSite,
      viewsByDay,
      topProjects,
      topCountries,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}