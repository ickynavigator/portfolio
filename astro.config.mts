import path from "path";
import { fileURLToPath } from "url";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    sanity({
      dataset: env.SANITY_API_DATASET!,
      projectId: env.SANITY_API_PROJECT_ID!,
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

  experimental: {
    env: {
      schema: {
        SANITY_API_PROJECT_ID: envField.string({
          context: "client",
          access: "public",
          optional: false,
        }),
        SANITY_API_DATASET: envField.string({
          context: "client",
          access: "public",
          optional: true,
          default: "production",
        }),
      },
    },
  },
});
