// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      DATABASE_URL: envField.string({
        access: "secret",
        context: "server",
        min: 1,
      }),
      GOOGLE_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
        min: 1,
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
        min: 1,
      }),
      BETTER_AUTH_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  output: "server",
  adapter: process.env.RENDER
    ? node({
        mode: "standalone",
      })
    : netlify(),
});
