// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import cloudflare from "@astrojs/cloudflare";

function getAdapter() {
  console.log("process.env ==> ", process.env);
  /**
   * https://developers.cloudflare.com/workers/wrangler/system-environment-variables/#supported-environment-variables
   */
  if (process.env.CLOUDFLARE_ACCOUNT_ID) {
    console.log("Building for Cloudflare");
    return cloudflare();
  }

  /**
   * https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL
   */
  if (process.env.VERCEL) {
    console.log("Building for Vercel");

    return vercel({ excludeFiles: ["wrangler.jsonc"] });
  }

  /**
   * https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
   */
  if (process.env.NETLIFY) {
    console.log("Building for Netlify");
    return netlify({
      excludeFiles: ["wrangler.jsonc"],
    });
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
