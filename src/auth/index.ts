import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "~/db";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "astro:env/server";
import { BETTER_AUTH_URL } from "astro:env/client";
import { site } from "astro:config/server";

export const auth = betterAuth({
  logger: { level: "debug" },
  basePath: "/api/auth",
  baseURL: BETTER_AUTH_URL || site!,
  emailAndPassword: { enabled: false },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  trustedOrigins: ["https://accounts.google.com"],
});

export type Session = typeof auth.$Infer.Session;
