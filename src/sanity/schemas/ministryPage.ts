import { defineType, defineField } from "sanity";

export default defineType({
  name: "ministryPage",
  title: "Ministry Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: 'Must match the route, e.g. "ccbmen", "ccbwomen", "youth"',
      options: { source: "title" },
    }),
    defineField({
      name: "title",
      title: "Ministry Name",
      type: "string",
      description: 'e.g. "Men\'s Ministry"',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "text",
      description: "Main body text for this ministry page.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
