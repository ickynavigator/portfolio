import path from "path";
import { fileURLToPath } from "url";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { getEnv } from "./src/lib/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");
const env = getEnv(_env);

// https://astro.build/config
export default defineConfig({
  output: "hybrid",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),

  integrations: [
    sanity({
      dataset: env.PUBLIC_SANITY_API_DATASET,
      projectId: env.PUBLIC_SANITY_API_PROJECT_ID,
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src/"),
      },
    },
  },
});
