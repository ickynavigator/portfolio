import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "hidden",
      title: "Hide Post",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "archived",
      title: "Archive Post",
      description:
        "This will prevent a post from showing up in the search/page list but it will still be available for people to access",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "postedAt",
      title: "Posted at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Post Images",
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
      name: "body",
      title: "Body",
      type: "blockContent",
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
