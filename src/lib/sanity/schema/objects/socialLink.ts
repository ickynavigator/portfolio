import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Social Media Link",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Social Media Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "link",
      title: "Social Media Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
