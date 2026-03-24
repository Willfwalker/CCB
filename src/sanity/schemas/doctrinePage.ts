import { defineType, defineField } from "sanity";

export default defineType({
  name: "doctrinePage",
  title: "Doctrine & Beliefs",
  type: "document",
  fields: [
    defineField({
      name: "doctrines",
      title: "Doctrinal Statements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description: 'e.g. "The Trinity"',
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "category" },
          },
        },
      ],
    }),
    defineField({
      name: "pressResources",
      title: "Dive Deeper Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "resourceType",
              title: "Type",
              type: "string",
              options: {
                list: ["Podcast", "Article"],
              },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
            defineField({
              name: "color",
              title: "Accent Color",
              type: "string",
              options: {
                list: [
                  { title: "Sky Blue", value: "var(--color-sky)" },
                  { title: "Navy", value: "var(--color-navy)" },
                  { title: "Gold", value: "var(--color-gold-dk)" },
                  { title: "Paper", value: "var(--color-paper)" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "resourceType" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Doctrine & Beliefs" };
    },
  },
});
