import { defineArrayMember, defineType } from "sanity";

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
        { title: "Normal", value: "normal" as const },
        { title: "H1", value: "h1" as const },
        { title: "H2", value: "h2" as const },
        { title: "H3", value: "h3" as const },
        { title: "H4", value: "h4" as const },
        { title: "H5", value: "h5" as const },
        { title: "H6", value: "h6" as const },
        { title: "Quote", value: "blockquote" as const },
      ],
      lists: [
        { title: "Bullet", value: "bullet" as const },
        { title: "Numbered", value: "number" as const },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" as const },
          { title: "Emphasis", value: "em" as const },
          { title: "Code", value: "code" as const },
          { title: "Underline", value: "underline" as const },
          { title: "Strike", value: "strike-through" as const },
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
