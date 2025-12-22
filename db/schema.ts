import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const storysTable = pgTable("storys", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  storyId: varchar("storyId", { length: 255 }).notNull().unique(),
  subject: varchar("subject", { length: 255 }).notNull(),

  type: varchar("type", { length: 50 }).notNull(),
  ageGroup: varchar("ageGroup", { length: 50 }).notNull(),

  imageUrl: varchar("imageUrl", { length: 500 }).default(""),
  content: json("content"),
  email: varchar("email", { length: 255 }).references(() => usersTable.email),
});
