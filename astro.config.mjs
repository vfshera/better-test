// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import node from "@astrojs/node";

import vercel from "@astrojs/vercel";

function getAdapter() {
  /**
   * https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL
   */
  if (process.env.VERCEL) {
    console.log("Building for Vercel");

    return vercel();
  }

  /**
   * https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
   */
  if (process.env.NETLIFY) {
    console.log("Building for Netlify");
    return netlify();
  }

  console.log("Building for Node");
  return node({
    mode: "middleware",
  });
}

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
  adapter: getAdapter(),
});
