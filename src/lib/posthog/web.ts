import { posthog } from "posthog-js";

import { getEnv } from "~/lib/env";

export function getPostHogInstance() {
  const env = getEnv();

  posthog.init(env.PUBLIC_POSTHOG_API_KEY, {
    api_host: env.PUBLIC_POSTHOG_API_HOST,
    ui_host: env.PUBLIC_POSTHOG_UI_HOST,
  });

  return {
    posthog,
  };
}
