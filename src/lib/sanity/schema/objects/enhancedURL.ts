import { defineField, defineType } from "sanity";

export default defineType({
  name: "enhancedURL",
  title: "Wrapper for URL with utils",
  type: "object",
  fields: [
    defineField({
      name: "display",
      title: "Display Text",
      type: "string",
      description: "This is the text that will be displayed by the URL",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "hidden",
      title: "Hide URL",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
