import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import env from '~/env';
import { schema } from '~/lib/sanity/schema';

export default defineConfig({
  basePath: '/studio',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
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
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_DATASET }),
    codeInput(),
  ],
});
