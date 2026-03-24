import { defineType, defineField } from "sanity";

export default defineType({
  name: "visitPage",
  title: "Visit Page",
  type: "document",
  fields: [
    defineField({
      name: "serviceAddress",
      title: "Service Address",
      type: "string",
      description: 'e.g. "2826 Birchwood Avenue"',
    }),
    defineField({
      name: "serviceTimes",
      title: "Service Times",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "9:00 am", "11:00 am"',
    }),
    defineField({
      name: "nurseryInfo",
      title: "Nursery Info",
      type: "text",
      description: "Information about nursery and children's provisions.",
    }),
    defineField({
      name: "bulletinLink",
      title: "Bulletin PDF Link",
      type: "url",
      description: "Link to the current Sunday bulletin.",
    }),
    defineField({
      name: "sidebarImage",
      title: "Sidebar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "whatToExpect",
      title: "What to Expect",
      type: "text",
      description: "Description of what visitors can expect at a service.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Visit Page" };
    },
  },
});
