import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  CONFIGURATION_CONFIG_ID,
  PERSONAL_INFO_CONFIG_ID,
} from "~/lib/constants";
import { getEnv } from "~/lib/env";
import { schema } from "~/lib/sanity/schema";
import configuration from "~/lib/sanity/schema/documents/configuration";
import personalInfo from "~/lib/sanity/schema/documents/personalInfo";

const _getEnv = () => {
  try {
    return process.env;
  } catch {
    return import.meta.env;
  }
};

// --log-override:empty-import-meta=silent
const env = getEnv(_getEnv());

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  dataset: env.PUBLIC_SANITY_API_DATASET,
  projectId: env.PUBLIC_SANITY_API_PROJECT_ID,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio")
          .items([
            S.listItem()
              .title(configuration.title ?? "Configuration")
              .child(
                S.document()
                  .schemaType(configuration.name)
                  .documentId(CONFIGURATION_CONFIG_ID),
              ),
            S.listItem()
              .title(personalInfo.title ?? "Personal info")
              .child(
                S.document()
                  .schemaType(personalInfo.name)
                  .documentId(PERSONAL_INFO_CONFIG_ID),
              ),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !([configuration.name, personalInfo.name] as string[]).includes(
                  `${listItem.getId()}`,
                ),
            ),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],
  schema,
});
