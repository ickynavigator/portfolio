import { env } from "cloudflare:workers";
import { PostHog } from "posthog-node";

export function getPostHogInstance() {
  const posthog = new PostHog(env.PUBLIC_POSTHOG_API_KEY);

  return {
    [Symbol.dispose]() {
      posthog.shutdown();
    },
    posthog,
  };
}
