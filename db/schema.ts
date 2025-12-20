import { ageGroupEnum, storyTypeEnum } from "@/types/StoryType";
import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const storysTable = pgTable("storys", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  storyId: varchar().notNull().unique(),
  subject: varchar().notNull(),
  type: storyTypeEnum("type").notNull(),
  ageGroup: ageGroupEnum().notNull(),
  imageUrl: varchar().default(""),
  content: json(),
  email: varchar("email").references(() => usersTable.email),
});
