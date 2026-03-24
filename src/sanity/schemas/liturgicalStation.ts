import { defineType, defineField } from "sanity";

export default defineType({
  name: "liturgicalStation",
  title: "Liturgical Station",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Confession & Pardon"',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'e.g. "Sin Confessed, Grace Declared"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "scriptureRef",
      title: "Scripture Reference",
      type: "string",
      description: 'e.g. "1 John 1:9"',
    }),
    defineField({
      name: "extendedDetails",
      title: "Extended Details",
      type: "text",
      description: "Full description shown in the modal.",
    }),
    defineField({
      name: "extendedVerses",
      title: "Additional Scripture References",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "Psalm 51:1-4", "Romans 8:1"',
    }),
    defineField({
      name: "order",
      title: "Display Order (1-4)",
      type: "number",
      description: "Exactly 4 stations are expected. 1 = first.",
      validation: (Rule) => Rule.min(1).max(4),
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
