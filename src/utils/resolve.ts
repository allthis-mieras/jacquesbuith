// ./src/sanity/lib/resolve.ts

import { defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/post/${doc?.slug}`,
          },
          { title: "Posts", href: location.origin },
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        type: "type",
      },
      resolve: (doc) => {
        const locations = [];
        
        // Homepage goes to root
        if (doc?.type === "homepage") {
          locations.push({
            title: doc?.title || "Homepage",
            href: "/",
          });
        } 
        // Default pages go to their slug
        else if (doc?.slug) {
          locations.push({
            title: doc?.title || "Untitled",
            href: `/${doc.slug}`,
          });
        }
        
        return { locations };
      },
    }),
  },
};