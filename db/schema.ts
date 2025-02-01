import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
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
});

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const insertPageViewSchema = createInsertSchema(pageViews);
export const selectPageViewSchema = createSelectSchema(pageViews);
export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;
