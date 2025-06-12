import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "astro:env/server";
import schema from "./schema";

const db = drizzle(DATABASE_URL, { schema });

export { db, schema };
