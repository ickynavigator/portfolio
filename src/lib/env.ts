import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// TODO: --log-override:empty-import-meta=silent
export const _getEnv = (tryProcess = false) => {
  if (tryProcess) {
    try {
      if (typeof window === "undefined") {
        return process.env;
      } else {
        return import.meta.env;
      }
    } catch {
      return import.meta.env;
    }
  }

  return import.meta.env;
};

type RuntimeEnv = Record<string, string | boolean | number | undefined>;
export const getEnv = (runtimeEnv: RuntimeEnv = _getEnv()) => {
  return createEnv({
    clientPrefix: "PUBLIC_",
    client: {},
    server: {
      WAKATIME_API_KEY: z.string(),
    },
    shared: {
      SANITY_API_PROJECT_ID: z.string().min(1).default("gtsyvuts"),
      SANITY_API_DATASET: z.string().min(1).default("production"),
      SANITY_API_VERSION: z.string().min(1).default("2022-03-07"),
      SANITY_VISUAL_EDITING_ENABLED: booleanish().default(false),
      SANITY_API_READ_TOKEN: z.string().optional(),

      POSTHOG_API_KEY: z.string().min(1),
      POSTHOG_API_HOST: z.string().url().default("https://us.i.posthog.com"),
      POSTHOG_UI_HOST: z.string().url().default("https://us.posthog.com"),

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
      CF_PAGES: numberish().optional(),
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

const booleanish = () =>
  z.union([
    z.boolean(),
    z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
  ]);

const numberish = () => z.union([z.number(), z.string().transform(Number)]);
