import { PostHog } from "posthog-node";

import { env } from "~/lib/env/client";

export function getPostHogInstance() {
  const posthog = new PostHog(env.PUBLIC_POSTHOG_API_KEY);

  return {
    [Symbol.dispose]() {
      posthog.shutdown();
    },
    posthog,
  };
}
