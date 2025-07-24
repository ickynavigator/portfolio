import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { webhooksTrigger } from "sanity-plugin-webhooks-trigger";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
  CONFIGURATION_CONFIG_ID,
  PERSONAL_INFO_CONFIG_ID,
} from "~/lib/constants";
import { env } from "~/lib/env/server";
import locationResolver from "~/lib/sanity/location";
import { schema } from "~/lib/sanity/schema";
import configuration from "~/lib/sanity/schema/documents/configuration";
import personalInfo from "~/lib/sanity/schema/documents/personalInfo";

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
    visionTool({
      defaultApiVersion: env.PUBLIC_SANITY_API_VERSION,
      defaultDataset: env.PUBLIC_SANITY_API_DATASET,
    }),
    presentationTool({
      resolve: {
        locations: locationResolver,
      },
      previewUrl: {},
    }),
    codeInput(),
    webhooksTrigger(),
  ],
  schema,
});
