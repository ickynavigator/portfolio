import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

type RuntimeEnv = Record<string, string | boolean | number | undefined>;
export const getEnv = (runtimeEnv: RuntimeEnv) => {
  return createEnv({
    clientPrefix: "PUBLIC_",
    client: {
      PUBLIC_SANITY_API_PROJECT_ID: z.string().min(1),
      PUBLIC_SANITY_API_DATASET: z.string().min(1).default("production"),
    },
    server: {
      SANITY_API_READ_TOKEN: z.string().min(1),
      SANITY_API_WRITE_TOKEN: z.string().min(1),
    },
    shared: {},
    runtimeEnv: runtimeEnv,
    emptyStringAsUndefined: true,
  });
};
