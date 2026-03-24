import { defineType, defineField } from "sanity";

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'Display date, e.g. "Mar 7" or "Sundays thru Mar 29"',
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
      name: "rsvpLink",
      title: "RSVP Link",
      type: "url",
      description: "Optional link for signups.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
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
    select: { title: "title", subtitle: "date" },
  },
});
