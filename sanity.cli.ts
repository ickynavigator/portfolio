import { defineCliConfig } from "sanity/cli";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineCliConfig({
  api: {
    projectId: "gtsyvuts",
    dataset: "production",
  },
  studioHost: "obifortune",
  vite: defineConfig({
    plugins: [tsconfigPaths()],
  }),
});
