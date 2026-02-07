import { defineCliConfig } from "sanity/cli";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import {
  SANITY_API_DATASET,
  SANITY_APP_ID,
  SANITY_PROJECT_ID,
} from "./src/lib/constants";

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_API_DATASET,
  },
  deployment: {
    appId: SANITY_APP_ID,
    autoUpdates: true,
  },
  vite: defineConfig({
    plugins: [tsconfigPaths()],
  }),
  schemaExtraction: {
    path: "./sanity.schema.json",
    enforceRequiredFields: true,
  },
  typegen: {
    path: "./src/**/*.{ts,tsx,js,jsx}",
    schema: "./sanity.schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
    formatGeneratedCode: true,
    enabled: true,
  },
});
