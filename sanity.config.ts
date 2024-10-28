import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { SANITY_API_DATASET, SANITY_API_PROJECT_ID } from 'astro:env/client';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { CONFIGURATION_CONFIG_ID, PERSONAL_INFO_CONFIG_ID } from '~/lib/constants';
import { schema } from '~/lib/sanity/schema';
import configuration from '~/lib/sanity/schema/documents/configuration';
import personalInfo from '~/lib/sanity/schema/documents/personalInfo';

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  dataset: SANITY_API_DATASET,
  projectId: SANITY_API_PROJECT_ID,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio')
          .items([
            S.listItem()
              .title(configuration.title ?? 'Configuration')
              .child(
                S.document().schemaType(configuration.name).documentId(CONFIGURATION_CONFIG_ID)
              ),
            S.listItem()
              .title(personalInfo.title ?? 'Personal info')
              .child(
                S.document().schemaType(personalInfo.name).documentId(PERSONAL_INFO_CONFIG_ID)
              ),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !([configuration.name, personalInfo.name] as string[]).includes(
                  `${listItem.getId()}`
                )
            ),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],
  schema,
});
