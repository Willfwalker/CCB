import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { sanityConfig } from "./src/sanity/config";

// Singleton document types (only one instance)
const singletonTypes = new Set(["homePage", "visitPage", "doctrinePage"]);

// Titles for singleton types
const singletonTitles: Record<string, string> = {
  homePage: "Home Page",
  visitPage: "Visit Page",
  doctrinePage: "Doctrine & Beliefs",
};

export default defineConfig({
  name: "ccb-studio",
  title: "Christ Church Bellingham",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons at the top
            ...["homePage", "visitPage", "doctrinePage"].map((type) =>
              S.listItem()
                .title(singletonTitles[type])
                .id(type)
                .child(
                  S.document().schemaType(type).documentId(type)
                )
            ),
            S.divider(),
            // List types
            S.documentTypeListItem("announcement").title("Announcements"),
            S.documentTypeListItem("faqItem").title("FAQ Items"),
            S.documentTypeListItem("coreValue").title("Core Values"),
            S.documentTypeListItem("liturgicalStation").title(
              "Liturgy Stations"
            ),
            S.documentTypeListItem("ministryPage").title("Ministry Pages"),
          ]),
    }),
    visionTool({ defaultApiVersion: sanityConfig.apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing in "new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
