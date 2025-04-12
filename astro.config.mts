import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import {
  SANITY_API_DATASET,
  SANITY_API_VERSION,
  SANITY_PROJECT_ID,
} from "./src/lib/constants";
import { cloudflareWorkers } from "./src/lib/env/preset/cloudflare-workers";

const env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: env.WEBSITE_URL ?? "https://obifortune.com",

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
      dataset: SANITY_API_DATASET,
      projectId: SANITY_PROJECT_ID,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      stega: {},
    }),
    react(),
    sitemap(),
    compress({
      CSS: false,
    }),
  ],

  env: {
    schema: {
      WEBSITE_URL: envField.string({
        access: "public",
        context: "client",
        default: "https://obifortune.com",
      }),

      PUBLIC_SANITY_VISUAL_EDITING_ENABLED: envField.boolean({
        access: "public",
        context: "client",
        default: false,
        optional: true,
      }),
      SANITY_API_READ_TOKEN: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),

      PUBLIC_POSTHOG_API_KEY: envField.string({
        access: "public",
        context: "client",
        default: "phc_tsOUKsYrGpDKtq0LDG4uWzav1y8TwkHLRVadr8TIrv6",
      }),
      PUBLIC_POSTHOG_API_HOST: envField.string({
        access: "public",
        context: "client",
        default: "https://us.i.posthog.com",
      }),
      PUBLIC_POSTHOG_UI_HOST: envField.string({
        access: "public",
        context: "client",
        default: "https://us.posthog.com",
      }),

      WAKATIME_API_KEY: envField.string({
        access: "secret",
        context: "server",
      }),

      LASTFM_API_KEY: envField.string({
        access: "secret",
        context: "server",
      }),
      LASTFM_USER: envField.string({
        access: "public",
        context: "client",
      }),

      PUBLIC_PARTY_URL: envField.string({
        access: "public",
        context: "client",
        default: "http://localhost:1999",
      }),

      ...cloudflareWorkers,
    },
  },

  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
    ssr: {
      external: [
        "crypto",
        "node:crypto",
        "node:fs",
        "node:readline",
        "node:path",
      ],
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
});
