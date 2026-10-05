// ./src/sanity/lib/resolve.ts

import { defineDocuments, defineLocations } from "sanity/presentation";
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
          { title: "Posts", href: typeof location !== 'undefined' ? location.origin : '/' },
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
  mainDocuments: defineDocuments([
    {
      route: '/post/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
    {
      route: '/',
      filter: `_type == "page" && type == "homepage"`,
    },
  ]),
};