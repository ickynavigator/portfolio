import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

type RuntimeEnv = Record<string, string | boolean | number | undefined>;
export const getEnv = (runtimeEnv: RuntimeEnv) => {
  return createEnv({
    clientPrefix: "PUBLIC_",
    client: {},
    server: {
      SANITY_API_WRITE_TOKEN: z.string().min(1),
    },
    shared: {
      PUBLIC_SANITY_API_PROJECT_ID: z.string().min(1),
      PUBLIC_SANITY_API_DATASET: z.string().min(1).default("production"),
    },
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
  });
};
