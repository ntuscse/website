import { CollectionConfig } from "payload/types";
import populateSlug from "./hooks/populateSlug";
import CardBlock from "../blocks/Card";
import { FormBlock } from "../blocks/Form";
import { PhotoGalleryBlock } from "../blocks/Gallery";
import GridBlock from "../blocks/Grid";
import { HeroBlock } from "../blocks/Hero";
import { TwoColumnsBlock } from "../blocks/TwoColumn";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    defaultColumns: ["title", "status", "author"],
    useAsTitle: "title",
    group: "Content",
    preview: (doc, _options) => {
      if (doc?.slug) {
        return `${process.env.FRONTEND_STAGING_DOMAIN}/pages/${doc.slug as string}`;
      }
      return null;
    },
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
      label: "Title",
      required: true,
    },
    {
      name: "layout",
      label: "Page Layout",
      type: "blocks",
      minRows: 1,
      blocks: [
        CardBlock,
        FormBlock,
        PhotoGalleryBlock,
        GridBlock,
        HeroBlock,
        TwoColumnsBlock
      ],
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "This is automatically generated from the title.",
      },
      hooks: {
        beforeChange: [populateSlug],
      },
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

export default Pages;
