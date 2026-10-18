import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";

import { ignoreUseNoMemo } from "./plugins/ignore-use-no-memo";
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

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Hepta Slab",
      cssVariable: "--font-hepta-slab",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
    },
  ],

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
    plugins: [tailwindcss(), ignoreUseNoMemo()],
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
});
