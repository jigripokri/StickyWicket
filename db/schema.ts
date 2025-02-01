import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  country: text("country"),
  city: text("city"),
  referrer: text("referrer"),
});

export const projectClicks = pgTable("project_clicks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const insertPageViewSchema = createInsertSchema(pageViews);
export const selectPageViewSchema = createSelectSchema(pageViews);
export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;

export const insertProjectClickSchema = createInsertSchema(projectClicks);
export const selectProjectClickSchema = createSelectSchema(projectClicks);
export type ProjectClick = typeof projectClicks.$inferSelect;
export type NewProjectClick = typeof projectClicks.$inferInsert;