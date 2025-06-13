/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import("~/auth").Session["user"] | null;
    session: import("~/auth").Session | null;
  }
}
