import { defineArrayMember, defineField, defineType } from "sanity";

import {
  BlockQuoteDanger,
  BlockQuoteInfo,
  BlockQuoteSuccess,
  BlockQuoteWarning,
  Highlight,
} from "~/lib/sanity/schema/objects/blockContent.components";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      options: {
        spellCheck: false,
      },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
        BlockQuoteInfo,
        BlockQuoteSuccess,
        BlockQuoteWarning,
        BlockQuoteDanger,
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          Highlight,
        ],
      },
    }),

    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          validation: (Rule) => Rule.required().min(3),
        }),
      ],
      validation: (Rule) => Rule.required().assetRequired(),
    }),

    defineArrayMember({
      type: "code",
      options: {
        withFilename: true,
        language: "typescript",
      },
    }),
  ],
});
