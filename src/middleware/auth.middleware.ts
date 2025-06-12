import { defineMiddleware } from "astro:middleware";
import { auth } from "~/auth";

export const authMiddleware = defineMiddleware(async (ctx, next) => {
  const isAuthed = await auth.api.getSession({
    headers: ctx.request.headers,
  });

  if (isAuthed) {
    ctx.locals.user = isAuthed.user;
    ctx.locals.session = isAuthed.session;
  } else {
    ctx.locals.user = null;
    ctx.locals.session = null;
  }

  return next();
});
