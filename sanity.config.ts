// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

// Get production URL - gebruik location.origin zoals in de guide
const productionUrl = typeof location !== 'undefined' ? location.origin : 'http://localhost:4321';

import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from "./schema";
import { resolve } from "./src/utils/resolve";
import { CogIcon } from "@sanity/icons";
// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings"])

export default defineConfig({
  name: "JacquesBuith",
  title: "Jacques Buith",
  projectId,
  dataset,
   plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
          // Regular document types
            S.documentTypeListItem("post").title("Posts"),
             S.documentTypeListItem("page").title("Pages"),
            // Our singleton type has a list item with a custom child
             S.listItem()
              .title("Settings")
              .id("settings")
              .icon(CogIcon)
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),
            
          ]),
    }),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: productionUrl,
    }),
  ],
  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,

    // productionUrl will be added back when we configure presentationTool
    // productionUrl: async (prev, context) => {
    //   ...
    // }
  },
})

