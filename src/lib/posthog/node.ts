import { PUBLIC_POSTHOG_API_KEY } from "astro:env/client";
import { PostHog } from "posthog-node";

export function getPostHogInstance() {
  const posthog = new PostHog(PUBLIC_POSTHOG_API_KEY);

  return {
    [Symbol.dispose]() {
      posthog.shutdown();
    },
    posthog,
  };
}
