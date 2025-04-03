import { posthog } from "posthog-js";

import { getEnv } from "~/lib/env";

export function getPostHogInstance() {
  const env = getEnv();

  posthog.init(env.POSTHOG_API_KEY, {
    api_host: env.POSTHOG_API_HOST,
    ui_host: env.POSTHOG_UI_HOST,
  });

  return {
    posthog,
  };
}
