/// <reference types="vitest/config" />
import { getContainerRenderer as getReactRenderer } from "@astrojs/react/container-renderer";
import { playwright } from "@vitest/browser-playwright";
import { getViteConfig } from "astro/config";
import { astroRenderer } from "vitest-browser-astro/plugin";

export default getViteConfig({
  plugins: [astroRenderer({ renderers: [getReactRenderer()] })],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: ["src/tests"],
    },
    projects: [
      {
        test: {
          name: "Unit Tests",
          include: ["./src/**/*.unit.{test,spec}.ts"],
        },
      },
      {
        test: {
          name: "Browser Tests - Playwright",
          include: ["./src/**/*.browser.{test,spec}.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              { browser: "chromium" },
              { browser: "firefox" },
              { browser: "webkit" },
            ],
          },
        },
      },
    ],
  },
});
