import { type SchemaTypeDefinition } from 'sanity';

import configuration from '~/sanity/schema/documents/configuration';
import personalInfo from '~/sanity/schema/documents/personalInfo';
import category from '~/sanity/schema/documents/category';
import blockContent from '~/sanity/schema/objects/blockContent';
import socialLink from '~/sanity/schema/objects/socialLink';
import post from '~/sanity/schema/documents/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuration, personalInfo, category, blockContent, socialLink, post],
};
