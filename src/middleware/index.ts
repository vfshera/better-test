import { sequence } from "astro:middleware";
import { authMiddleware } from "./auth.middleware";
import { redirectsMiddleware } from "./redirect.middleware";

export const onRequest = sequence(authMiddleware, redirectsMiddleware);
