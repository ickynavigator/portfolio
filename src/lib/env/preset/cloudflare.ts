import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

type RuntimeEnv = Record<string, string | boolean | number | undefined>;

/**
 * @see https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
 */
export const cloudflare = (runtimeEnv: RuntimeEnv) =>
  createEnv({
    server: {
      CI: z.stringbool().optional(),
      NODE_ENV: z.enum(["development", "production"]).optional(),

      WRANGLER_CI_GENERATE_PREVIEW_ALIAS: z.stringbool().optional(),
      WRANGLER_CI_OVERRIDE_NAME: z.string().optional(),
      WRANGLER_CI_MATCH_TAG: z.string().optional(),
      WRANGLER_CI_OVERRIDE_NETWORK_MODE_HOST: z.stringbool().optional(),

      WORKERS_CI: z
        .string()
        .transform((s) => parseInt(s, 10))
        .pipe(z.number())
        .optional(),
      WORKERS_CI_BUILD_UUID: z.string().optional(),
      WORKERS_CI_BRANCH: z.string().optional(),
      WORKERS_CI_COMMIT_SHA: z.string().optional(),

      CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
      CLOUDFLARE_API_TOKEN: z.string().optional(),
    },
    runtimeEnv,
  });
