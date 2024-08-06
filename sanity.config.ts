import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import env from '~/env';
import { CONFIGURATION_CONFIG_ID, PERSONAL_INFO_CONFIG_ID } from '~/lib/constants';
import { resolve } from '~/lib/sanity/presentation/resolve';
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
              .child(S.document().schemaType('configuration').documentId(CONFIGURATION_CONFIG_ID)),
            S.listItem()
              .title('Personal info')
              .child(S.document().schemaType('personalInfo').documentId(PERSONAL_INFO_CONFIG_ID)),
            ...S.documentTypeListItems().filter(
              (listItem) => !['configuration', 'personalInfo'].includes(`${listItem.getId()}`),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    codeInput(),
  ],
});
