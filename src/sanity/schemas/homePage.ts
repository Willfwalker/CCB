import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      description: "The large background image on the home page hero section.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroScriptureRef",
      title: "Hero Scripture Reference",
      type: "string",
      description: 'e.g. "John 6:37"',
    }),
    defineField({
      name: "heroScriptureText",
      title: "Hero Scripture Text",
      type: "text",
      description: "The scripture quote displayed on the hero section.",
    }),
    defineField({
      name: "familyQuote",
      title: "Family Section Quote",
      type: "text",
      description: "The quote shown over the family photo.",
    }),
    defineField({
      name: "familyImage",
      title: "Family Section Image",
      type: "image",
      description: "The photo in the Family section.",
      options: { hotspot: true },
    }),
    defineField({
      name: "familyTitle",
      title: "Family Section Title",
      type: "string",
    }),
    defineField({
      name: "familyBody",
      title: "Family Section Body Text",
      type: "text",
      description: "The paragraphs shown when the family section expands. Separate paragraphs with a blank line.",
    }),
    defineField({
      name: "youtubeVideoUrl",
      title: "YouTube Video URL",
      type: "url",
      description: 'The embed URL for the "Who Are We" video, e.g. https://www.youtube.com/embed/BBEQdFyD_SY',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
