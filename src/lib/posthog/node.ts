import { PostHog } from "posthog-node";

import { getEnv } from "~/lib/env";

export function getPostHogInstance() {
  const env = getEnv();

  const posthog = new PostHog(env.PUBLIC_POSTHOG_API_KEY);

  return {
    [Symbol.dispose]() {
      posthog.shutdown();
    },
    posthog,
  };
}
