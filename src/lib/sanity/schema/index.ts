import { type SchemaTypeDefinition } from 'sanity';

import category from '~/lib/sanity/schema/documents/category';
import configuration from '~/lib/sanity/schema/documents/configuration';
import personalInfo from '~/lib/sanity/schema/documents/personalInfo';
import post from '~/lib/sanity/schema/documents/post';
import blockContent from '~/lib/sanity/schema/objects/blockContent';
import socialLink from '~/lib/sanity/schema/objects/socialLink';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuration, personalInfo, category, blockContent, socialLink, post],
};
