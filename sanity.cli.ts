import { defineCliConfig } from "sanity/cli";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineCliConfig({
  api: {
    projectId: "gtsyvuts",
    dataset: "production",
  },
  deployment: {
    appId: "x7g0q8vgghymguyw1oebd4w3",
    autoUpdates: true,
  },
  vite: defineConfig({
    plugins: [tsconfigPaths()],
  }),
});
