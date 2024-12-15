import path from "path";
import { loadEnvFile } from "process";
import { fileURLToPath } from "url";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";

import { getEnv } from "./src/lib/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnvFile();
const env = getEnv(process.env);

// https://astro.build/config
export default defineConfig({
  output: "static",

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
      apiVersion: env.PUBLIC_SANITY_API_VERSION,
      useCdn: false,
      studioBasePath: "/studio",
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
