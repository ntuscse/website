import { CollectionConfig } from "payload/types";
import populateSlug from "./hooks/populateSlug";

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
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "publishedDate",
      type: "date",
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
      name: "content",
      type: "richText",
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
  ],
};

export default Posts;
