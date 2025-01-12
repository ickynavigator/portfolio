import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { getEnv } from "./src/lib/env";

const _env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");
const env = getEnv(_env);

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: env.WEBSITE_URL,

  prefetch: {
    prefetchAll: true,
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),

  build: {
    redirects: false,
  },

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
});
