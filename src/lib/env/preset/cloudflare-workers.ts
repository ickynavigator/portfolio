import { envField } from "astro/config";
import type { EnvSchema } from "node_modules/astro/dist/env/schema";

export const cloudflareWorkers = {
  CI: envField.boolean({
    access: "public",
    context: "client",
    default: false,
  }),
  NODE_ENV: envField.enum({
    access: "public",
    context: "client",
    values: ["development", "production"],
    default: "development",
  }),

  WRANGLER_CI_GENERATE_PREVIEW_ALIAS: envField.boolean({
    access: "public",
    context: "client",
    default: false,
  }),
  WRANGLER_CI_OVERRIDE_NAME: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
  WRANGLER_CI_MATCH_TAG: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
  WRANGLER_CI_OVERRIDE_NETWORK_MODE_HOST: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),

  WORKERS_CI: envField.number({
    access: "public",
    context: "client",
    optional: true,
  }),
  WORKERS_CI_BUILD_UUID: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
  WORKERS_CI_BRANCH: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
  WORKERS_CI_COMMIT_SHA: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),

  CLOUDFLARE_ACCOUNT_ID: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
  CLOUDFLARE_API_TOKEN: envField.string({
    access: "public",
    context: "client",
    optional: true,
  }),
} satisfies EnvSchema;
