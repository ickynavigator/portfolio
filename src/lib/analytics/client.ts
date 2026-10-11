import { posthog } from "posthog-js";

/**
 * Start client-side PostHog analytics.
 *
 * Owns the client config and the enable policy: does nothing on localhost.
 */
export function initClientAnalytics() {
  if (window.location.hostname === "localhost") return;

  posthog.init(import.meta.env.PUBLIC_POSTHOG_API_KEY, {
    api_host: import.meta.env.PUBLIC_POSTHOG_API_HOST,
    ui_host: import.meta.env.PUBLIC_POSTHOG_UI_HOST,
  });
}
