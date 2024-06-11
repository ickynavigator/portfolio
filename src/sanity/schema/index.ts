import { type SchemaTypeDefinition } from 'sanity';

import category from '~/sanity/schema/documents/category';
import configuration from '~/sanity/schema/documents/configuration';
import personalInfo from '~/sanity/schema/documents/personalInfo';
import post from '~/sanity/schema/documents/post';
import blockContent from '~/sanity/schema/objects/blockContent';
import socialLink from '~/sanity/schema/objects/socialLink';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuration, personalInfo, category, blockContent, socialLink, post],
};
