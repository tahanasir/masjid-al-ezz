import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Announcement Schema
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
});

// Event Schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date").notNull(),
  startTime: text("start_time").notNull().default("09:00"),
  endTime: text("end_time").notNull().default("17:00"),
  location: text("location").notNull(),
  organizer: text("organizer"),
  isActive: boolean("is_active").notNull().default(true),
  // Type field to distinguish between different event types
  eventType: text("event_type").notNull().default("special"), // "regular", "special"
  isRecurring: boolean("is_recurring").notNull().default(false), // Weekly events like Jumaa
  recurringDay: text("recurring_day"), // Monday, Tuesday, etc.
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

// Program Schema (requires registration, may have costs)
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  schedule: text("schedule").notNull(),
  time: text("time"),
  instructor: text("instructor"),
  image: text("image"),
  location: text("location").default("Main Prayer Hall"),
  cost: text("cost"), // Can be null for free programs
  registrationRequired: boolean("registration_required")
    .notNull()
    .default(true),
  startDate: timestamp("start_date"), // When the program begins
  endDate: timestamp("end_date"), // When the program ends
  isActive: boolean("is_active").notNull().default(true),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
});

// Contact Message Schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isRead: boolean("is_read").notNull().default(false),
});

export const insertContactMessageSchema = createInsertSchema(
  contactMessages,
).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

// Donation Schema
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  name: text("name"),
  email: text("email"),
  donationType: text("donation_type").notNull(), // one-time, monthly, etc.
  fund: text("fund").notNull(), // General, Building Maintenance, etc.
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
});

// User Schema (already defined in initial schema, kept for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Type Exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programs.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

// Local Businesses
export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logoUrl: text("logo_url"),
  discount: text("discount"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  createdAt: true,
});

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;
