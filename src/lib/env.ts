import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// TODO: --log-override:empty-import-meta=silent
const _getEnv = () => {
  try {
    return process.env;
  } catch {
    return import.meta.env;
  }
};

type RuntimeEnv = Record<string, string | boolean | number | undefined>;
export const getEnv = (runtimeEnv: RuntimeEnv = _getEnv()) => {
  return createEnv({
    clientPrefix: "PUBLIC_",
    client: {},
    server: {},
    shared: {
      PUBLIC_SANITY_API_PROJECT_ID: z.string().min(1).default("gtsyvuts"),
      PUBLIC_SANITY_API_DATASET: z.string().min(1).default("production"),
      PUBLIC_SANITY_API_VERSION: z.string().min(1).default("2022-03-07"),
      WEBSITE_URL: z.string().min(1).url().default("https://obifortune.com"),
    },
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
    extends: [cloudflare(runtimeEnv)],
  });
};

/**
 * @see https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
 */
export const cloudflare = (runtimeEnv: RuntimeEnv = process.env) =>
  createEnv({
    server: {
      /**
       * @description `1`
       * @example Changing build behaviour when run on Pages versus locally
       */
      CF_PAGES: z.string().optional(),
      /**
       * @description `<sha1-hash-of-current-commit>`
       * @example Passing current commit ID to error reporting, for example, Sentry
       */
      CF_PAGES_COMMIT_SHA: z.string().optional(),
      /**
       * @description `<branch-name-of-current-deployment>`
       * @example Customizing build based on branch, for example, disabling debug logging on `production`
       */
      CF_PAGES_BRANCH: z.string().optional(),
      /**
       * @description `<url-of-current-deployment>`
       * @example Allowing build tools to know the URL the page will be deployed at
       */
      CF_PAGES_URL: z.string().optional(),
    },
    runtimeEnv,
  });
