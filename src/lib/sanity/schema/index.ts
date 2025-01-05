import { type SchemaTypeDefinition } from "sanity";

import category from "~/lib/sanity/schema/documents/category";
import configuration from "~/lib/sanity/schema/documents/configuration";
import personalInfo from "~/lib/sanity/schema/documents/personalInfo";
import post from "~/lib/sanity/schema/documents/post";
import project from "~/lib/sanity/schema/documents/project";
import blockContent from "~/lib/sanity/schema/objects/blockContent";
import enhancedURL from "~/lib/sanity/schema/objects/enhancedURL";
import career from "./documents/career";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    configuration,
    personalInfo,
    category,
    blockContent,
    post,
    project,
    enhancedURL,
    career,
  ],
};
