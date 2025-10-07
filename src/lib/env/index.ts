import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { cloudflare } from "./preset/cloudflare";

type RuntimeEnv = Record<string, string | boolean | number | undefined>;
export const getEnv = (runtimeEnv: RuntimeEnv) => {
  return createEnv({
    clientPrefix: "PUBLIC_",
    client: {},
    server: {
      WAKATIME_API_KEY: z.string(),
    },
    shared: {
      PUBLIC_SANITY_API_PROJECT_ID: z.string().min(1).default("gtsyvuts"),
      PUBLIC_SANITY_API_DATASET: z.string().min(1).default("production"),
      PUBLIC_SANITY_API_VERSION: z.string().min(1).default("2022-03-07"),
      PUBLIC_POSTHOG_API_KEY: z
        .string()
        .min(1)
        .default("phc_tsOUKsYrGpDKtq0LDG4uWzav1y8TwkHLRVadr8TIrv6"),
      PUBLIC_POSTHOG_API_HOST: z.url().default("https://us.i.posthog.com"),
      PUBLIC_POSTHOG_UI_HOST: z.url().default("https://us.posthog.com"),
      WEBSITE_URL: z.url().min(1).default("https://obifortune.com"),
      PUBLIC_SANITY_VISUAL_EDITING_ENABLED: z.stringbool().default(false),
      SANITY_API_READ_TOKEN: z.string().optional(),
    },
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
    extends: [cloudflare(runtimeEnv)],
  });
};
