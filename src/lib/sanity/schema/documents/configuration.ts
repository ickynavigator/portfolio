import { defineField, defineType } from "sanity";

export default defineType({
  name: "configuration",
  title: "Configuration",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description:
        "The name of the website owner. Displayed in the header and the SEO info",
      validation: (Rule) => Rule.required(),
      initialValue: "Obi Fortune",
    }),

    defineField({
      name: "showOriginalSourceLink",
      title: "Show Original Source Link",
      type: "boolean",
      description:
        "Should a link to the original source code be shown in the portfolio",
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),

    defineField({
      name: "showSimpleCodePreview",
      title: "Show Simple Code Preview",
      type: "boolean",
      description:
        "Should the site use the basic prose code preview or the custom code block",
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
  ],
});
