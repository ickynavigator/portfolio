import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import {
  SANITY_API_DATASET,
  SANITY_API_VERSION,
  SANITY_PROJECT_ID,
} from "./src/lib/constants";

const env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

console.log("process.env", process.env);
console.log("import.meta.env", import.meta.env);

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: env.WEBSITE_URL ?? "https://obifortune.com",

  prefetch: {
    prefetchAll: true,
  },

  adapter: cloudflare({
    imageService: "passthrough",
  }),

  build: {
    redirects: false,
  },

  integrations: [
    react(),
    sanity({
      dataset: SANITY_API_DATASET,
      projectId: SANITY_PROJECT_ID,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      stega: {},
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
});
