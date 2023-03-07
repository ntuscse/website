import { CollectionConfig } from "payload/types";
import populateSlug from "./hooks/populateSlug";
import { ContentBlock } from "../blocks/Content";
import { MediaBlock } from "../blocks/Media";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "author", "category", "tags", "status"],
    useAsTitle: "title",
    group: "Content",
    preview: (doc, _options) => {
      if (doc?.slug) {
        return `${process.env.FRONTEND_STAGING_DOMAIN}/blog/${doc.slug}`
      }
      return null
    }
  },
  access: {
    read: () => true,

  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "layout",
      label: "Page Layout",
      type: "blocks",
      minRows: 1,
      blocks: [
        ContentBlock,
        MediaBlock
      ]
    },
    // sidebar stuff
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "This is automatically generated from the title."
      },
      hooks: {
        beforeChange: [
          populateSlug
        ]
      }
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Posts;
