import { env, waitUntil } from "cloudflare:workers";
import { PostHog } from "posthog-node";

import packageJson from "../../../package.json";

export function getPostHogClient() {
  return new PostHog(env.PUBLIC_POSTHOG_API_KEY, {
    host: env.PUBLIC_POSTHOG_API_HOST,
    logs: {
      serviceName: packageJson.name,
      environment: import.meta.env.MODE,
    },
  });
}

/**
 * Report a server-side exception to PostHog.
 *
 * Owns the client config and its lifecycle: the event is sent immediately and the
 * request is kept alive with `waitUntil` until it lands, so callers fire and forget.
 * Does nothing in development.
 */
export function captureServerException(error: unknown) {
  if (import.meta.env.DEV) return;

  const posthog = getPostHogClient();

  waitUntil(
    posthog
      .captureExceptionImmediate(error)
      .catch((reason: unknown) => {
        console.error("Failed to report exception to PostHog", reason);
      })
      .finally(() => posthog.shutdown()),
  );
}
