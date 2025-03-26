import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
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
      stega: {
        studioUrl: "/studio",
      },
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
        // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
        ...(import.meta.env.PROD
          ? { "react-dom/server": "react-dom/server.edge" }
          : {}),
      },
    },
    ssr: {
      external: ["node:crypto", "node:fs", "node:readline", "node:path"],
    },
  },
});
