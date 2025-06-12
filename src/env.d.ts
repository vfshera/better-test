/// <reference types="astro/client" />
type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {
    user: import("~/auth").Session["user"] | null;
    session: import("~/auth").Session | null;
  }
}
