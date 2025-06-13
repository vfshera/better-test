import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
expand(config());

async function main() {
  const app = Fastify({ logger: true });

  await app
    .register(fastifyStatic, {
      root: fileURLToPath(new URL("./dist/client", import.meta.url)),
    })
    .register(fastifyMiddie);

  app.use(ssrHandler);

  app.listen({ port: Number(process.env.PORT || 3000) });
}

main().catch(console.error);
