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

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: env.WEBSITE_URL ?? "https://obifortune.com",

  prefetch: {
    prefetchAll: true,
  },

  adapter: cloudflare({
    imageService: "passthrough",
    auxiliaryWorkers: [
      {
        config: {
          name: "partyserver",
          main: "./workers/party/index.ts",
          compatibility_date: "2026-09-10",
          observability: {
            logs: { enabled: true, invocation_logs: true },
            traces: { enabled: true },
          },
          send_metrics: true,
          durable_objects: {
            bindings: [{ name: "MyPartyServer", class_name: "MyPartyServer" }],
          },
          exports: {
            MyPartyServer: { type: "durable-object", storage: "sqlite" },
          },
        },
      },
    ],
  }),

  build: {
    redirects: false,
  },

  integrations: [
    react({ compiler: true }),
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
    },
  },
});
