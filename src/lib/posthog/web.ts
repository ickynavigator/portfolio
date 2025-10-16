import {
  PUBLIC_POSTHOG_API_HOST,
  PUBLIC_POSTHOG_API_KEY,
  PUBLIC_POSTHOG_UI_HOST,
} from "astro:env/client";
import { posthog } from "posthog-js";

export function getPostHogInstance() {
  posthog.init(PUBLIC_POSTHOG_API_KEY, {
    api_host: PUBLIC_POSTHOG_API_HOST,
    ui_host: PUBLIC_POSTHOG_UI_HOST,
  });

  return {
    posthog,
  };
}
