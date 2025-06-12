import { defineMiddleware } from "astro:middleware";

export const redirectsMiddleware = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname === "/" && ctx.locals.user) {
    return ctx.redirect("/dashboard");
  }

  if (ctx.url.pathname.startsWith("/dashboard") && !ctx.locals.user) {
    return ctx.redirect("/");
  }

  return next();
});
