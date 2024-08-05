import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import env from '~/env';
import { schema } from '~/lib/sanity/schema';

const {
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
} = env;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio')
          .items([
            S.listItem()
              .title('Configuration')
              .child(S.document().schemaType('configuration').documentId('configuration')),
            S.listItem()
              .title('Personal info')
              .child(S.document().schemaType('personalInfo').documentId('personalInfo')),
            ...S.documentTypeListItems().filter(
              (listItem) => !['configuration', 'personalInfo'].includes(`${listItem.getId()}`),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
});
