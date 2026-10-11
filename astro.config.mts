import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
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
  session: false,

  cache: {
    provider: cacheCloudflare(),
  },

  build: {
    redirects: false,
  },

  integrations: [
    react({}),
    sanity({
      dataset: SANITY_API_DATASET,
      projectId: SANITY_PROJECT_ID,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      stega: {
        studioUrl: "https://obifortune.sanity.studio",
      },
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
      rolldownOptions: {
        onwarn(warning, defaultHandler) {
          if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" &&
            warning.message.includes("use no memo")
          ) {
            return;
          }

          defaultHandler(warning);
        },
      },
    },
  },
});
