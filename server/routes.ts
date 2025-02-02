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

    const country = req.headers['cf-ipcountry'] || 'US'; // Default to US for demo
    try {
      await db.insert(pageViews).values({
        path: req.path,
        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip,
        referrer: req.headers["referer"] || null,
        country,
        city: null,
      });
    } catch (error) {
      console.error('Error inserting page view:', error);
    }
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
    try {
      const [
        totalVisitorsResult,
        pageViewsResult,
        avgTimeResult,
        viewsByDayResult,
        topProjectsResult,
        topCountriesResult,
      ] = await Promise.all([
        // Total unique visitors
        db
          .select({ count: sql<number>`count(distinct ${pageViews.ipAddress})` })
          .from(pageViews)
          .then(result => result[0].count),

        // Total page views
        db
          .select({ count: sql<number>`count(*)` })
          .from(pageViews)
          .then(result => result[0].count),

        // Calculate real average time on site
        db
          .execute(sql`
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
          .then(result => (result[0] as any)?.avg_time || '0:00'),

        // Daily views for the last 7 days
        db
          .execute(sql`
            WITH dates AS (
              SELECT generate_series(
                date_trunc('day', NOW() - INTERVAL '6 days'),
                date_trunc('day', NOW()),
                '1 day'::interval
              )::date as date
            )
            SELECT 
              to_char(dates.date, 'YYYY-MM-DD') as date,
              COALESCE(COUNT(pv.id), 0)::integer as views
            FROM dates
            LEFT JOIN page_views pv ON date_trunc('day', pv.timestamp) = dates.date
            GROUP BY dates.date
            ORDER BY dates.date
          `),

        // Top clicked projects with titles
        db
          .execute(sql`
            SELECT 
              pc.project_id as "projectId",
              COALESCE(p.title, 'Unknown Project') as title,
              COUNT(*)::integer as clicks
            FROM project_clicks pc
            LEFT JOIN projects p ON p.id = pc.project_id
            WHERE pc.timestamp > NOW() - INTERVAL '7 days'
            GROUP BY pc.project_id, p.title
            ORDER BY COUNT(*) DESC
            LIMIT 5
          `),

        // Top countries
        db
          .execute(sql`
            SELECT 
              COALESCE(country, 'Unknown') as country,
              COUNT(*)::integer as views
            FROM page_views
            WHERE timestamp > NOW() - INTERVAL '7 days'
            GROUP BY country
            ORDER BY COUNT(*) DESC
            LIMIT 5
          `),
      ]);

      const responseData = {
        totalVisitors: Number(totalVisitorsResult),
        pageViews: Number(pageViewsResult),
        avgTimeOnSite: avgTimeResult,
        viewsByDay: (viewsByDayResult as any).rows,
        topProjects: (topProjectsResult as any).rows,
        topCountries: (topCountriesResult as any).rows,
      };

      console.log('Analytics Response:', responseData);

      res.json(responseData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}