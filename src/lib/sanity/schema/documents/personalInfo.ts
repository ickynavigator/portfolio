import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "personalInfo",
  title: "Personal Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "jobStatus",
      title: "Job Status",
      type: "object",
      fields: [
        defineField({
          title: "Show Job Status",
          name: "show",
          type: "boolean",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: [
              { title: "Open For Hire", value: "open" },
              { title: "In Between Jobs", value: "inbetween" },
              { title: "Unavailable", value: "close" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "CV",
      title: "CV",
      type: "object",
      fields: [
        defineField({
          name: "file",
          title: "Curriculum Vitae File",
          type: "file",
        }),

        defineField({
          name: "lastupdatedAt",
          title: "CV Last Updated at",
          type: "date",
        }),
      ],
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "socialLinks",
      title: "Social Media",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: "skillTags",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      validation: (Rule) => Rule.unique(),
    }),
  ],
});
