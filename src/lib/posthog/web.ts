import { posthog } from "posthog-js";

import { env } from "~/lib/env/client";

export function getPostHogInstance() {
  posthog.init(env.PUBLIC_POSTHOG_API_KEY, {
    api_host: env.PUBLIC_POSTHOG_API_HOST,
    ui_host: env.PUBLIC_POSTHOG_UI_HOST,
  });

  return {
    posthog,
  };
}
