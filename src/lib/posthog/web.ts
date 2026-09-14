import { posthog } from "posthog-js";

export function getPostHogInstance() {
  posthog.init(import.meta.env.PUBLIC_POSTHOG_API_KEY, {
    api_host: import.meta.env.PUBLIC_POSTHOG_API_HOST,
    ui_host: import.meta.env.PUBLIC_POSTHOG_UI_HOST,
  });

  return {
    posthog,
  };
}
