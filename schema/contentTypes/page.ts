import { defineField, defineType } from "sanity";
import { DocumentIcon, HomeIcon } from "@sanity/icons";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "Default", value: "default" },
        ],
        layout: "dropdown",
      },
  //     validation: (Rule) =>
  // Rule.required().custom(async (value, context) => {
  //   if (value === "homepage") {
  //     const existingHomepage = await client.fetch(
  //       `*[_type == "page" && type == "homepage" && !(_id in path("drafts.**")) && _id != $id][0]`,
  //       { id: context.document?._id }
  //     );
  //     if (existingHomepage) {
  //       return "Er kan maar één gepubliceerde homepage zijn.";
  //     }
  //   }
  //   return true;
  // }),
    }),
    // Fields only for the homepage
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "heroText",
          title: "Text",
          type: "string",
        },
        {
          name: "heroSlides",
          title: "Slides",
          type: "array",
          of: [
            {
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
            },
            {
              type: "file",
              title: "Video",
              options: {
                accept: "video/mp4",
              },
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.type !== "homepage",
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
        },
        {
          name: "button",
          title: "Button",
          type: "object",
          fields: [
            {
              name: "url",
              title: "URL",
              type: "reference",
              to: [{ type: "page" }], // Reference to a page document type
              description: "Link to an internal page.",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
            },
          ],
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      hidden: ({ parent }) => parent?.type !== "homepage",
    }),

    // Fields for default pages
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type !== "default",
    }),
    defineField({
      name: "pageText",
      title: "Page Text",
      type: "blockContent",
      hidden: ({ parent }) => parent?.type !== "default",
    }),

    // Content modules for default pages
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "textBlock" },
        { type: "imageBlock" },
        { type: "videoBlock" },
        { type: "quoteBlock" },
        { type: "textImageBlock" },
      ],
      hidden: ({ parent }) => parent?.type !== "default",
    }),
    // SEO fields for all pages
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          title: "SEO Title",
          type: "string",
        },
        {
          name: "description",
          title: "SEO Description",
          type: "text",
        },
        {
          name: "image",
          title: "SEO Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
    },
    prepare(selection) {
      const { title, type } = selection;
      return {
        title: title,
        subtitle: type === "homepage" ? "Homepage" : "Default Page",
        media: type === "homepage" ? HomeIcon : DocumentIcon,
      };
    },
  },
});
