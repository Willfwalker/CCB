import { defineType, defineField } from "sanity";

export default defineType({
  name: "coreValue",
  title: "Core Value",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Grace", "Truth"',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'e.g. "It all starts here."',
    }),
    defineField({
      name: "colorVar",
      title: "Color Theme",
      type: "string",
      description: "CSS variable for this value's accent color.",
      options: {
        list: [
          { title: "Sky Blue", value: "var(--color-sky)" },
          { title: "Navy", value: "var(--color-navy)" },
          { title: "Gold", value: "var(--color-poppy)" },
          { title: "Green", value: "var(--color-sea)" },
          { title: "Wine", value: "var(--color-wine)" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Brief description shown on the card.",
    }),
    defineField({
      name: "extendedDetails",
      title: "Extended Details",
      type: "text",
      description: "Full description shown in the modal.",
    }),
    defineField({
      name: "verses",
      title: "Scripture Verses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "reference", title: "Reference", type: "string" }),
            defineField({ name: "text", title: "Verse Text", type: "text" }),
          ],
          preview: {
            select: { title: "reference" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order (1-5)",
      type: "number",
      description: "Exactly 5 core values are expected. 1 = first.",
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
