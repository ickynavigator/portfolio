import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "hidden",
      title: "Hide Project",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "archived",
      title: "Archive Project",
      description:
        "This will prevent a project from showing up in the search/page list but it will still be available for people to access",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: ["completed", "ongoing", "abandoned"],
        direction: "horizontal",
        layout: "radio",
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      initialValue: "Developer",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Project Images",
      type: "array",
      of: [
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
      ],
      initialValue: [],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
      initialValue: [],
      validation: (Rule) => Rule.required().unique(),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "enhancedURL" })],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images",
    },

    prepare(selection) {
      return { ...selection, media: selection.media[0] };
    },
  },
});
