import dayjs from "dayjs";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "career",
  title: "Career",
  type: "document",
  fields: [
    defineField({
      name: "hidden",
      title: "Hide Career",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "type",
      title: "Career Type",
      type: "string",
      options: {
        list: [
          "Contract",
          "Self-Employed",
          "Part-time",
          "Full-time",
          "Internship",
          "Apprenticeship",
          "Freelance",
        ],
        direction: "horizontal",
        layout: "radio",
      },
      initialValue: "Full-time",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      initialValue: [],
      validation: (Rule) => Rule.required().unique(),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: ["On-site", "Hybrid", "Remote"],
            direction: "horizontal",
            layout: "radio",
          },
          initialValue: "On-site",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "address",
          title: "Address",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "url",
          title: "URL",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessiblity",
              validation: (Rule) => Rule.required().min(3),
            }),
          ],
          validation: (Rule) => Rule.required().assetRequired(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "object",
      fields: [
        defineField({
          name: "start",
          title: "Start Date",
          type: "date",
          initialValue: new Date().toISOString().split("T")[0],
          validation: (Rule) =>
            Rule.required().custom((value, ctx) => {
              if (
                !(
                  ctx.document?.date &&
                  typeof ctx.document?.date === "object" &&
                  "end" in ctx.document.date &&
                  typeof ctx.document.date.end === "string"
                )
              ) {
                return true;
              }

              if (dayjs(value).isAfter(dayjs(ctx.document.date.end))) {
                return "Start date must be before end date";
              }

              return true;
            }),
        }),

        defineField({
          name: "end",
          title: "End Date",
          type: "date",
          validation: (Rule) => Rule.min(Rule.valueOfField("start")),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "enhancedURL" })],
      initialValue: [],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      company: "company",
    },
    prepare(selection) {
      return {
        title: selection?.title,
        subtitle: selection?.company?.name,
        media: selection?.company?.logo,
      };
    },
  },
});
