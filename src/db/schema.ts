import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAtTimestamp, updatedAtTimestamp } from "./utils";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type User = typeof users.$inferSelect;

export type InsertUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  token: text("token").unique().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  expiresAt: timestamp("expires_at", {
    mode: "date",
  }).notNull(),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Session = typeof sessions.$inferSelect;

export type InsertSession = Omit<Session, "id" | "createdAt" | "updatedAt">;

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    mode: "date",
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    mode: "date",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Account = typeof accounts.$inferSelect;

export type InsertAccount = Omit<Account, "id" | "createdAt" | "updatedAt">;

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
  }).notNull(),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Verification = typeof verifications.$inferSelect;

export type InsertVerification = Omit<
  Verification,
  "id" | "createdAt" | "updatedAt"
>;

export default {
  users,
  sessions,
  accounts,
  verifications,
};
