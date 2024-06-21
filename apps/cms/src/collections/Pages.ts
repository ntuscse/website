import { CollectionConfig } from "payload/types";
import populateSlug from "./hooks/populateSlug";
import CardBlock from "../blocks/Card";
import { FormBlock } from "../blocks/Form";
import { PhotoGalleryBlock } from "../blocks/Gallery";
import GridBlock from "../blocks/Grid";
import { HeroBlock } from "../blocks/Hero";
import { TwoColumnsBlock } from "../blocks/TwoColumn";
import NavbarBlock from "../blocks/NavBar";
import FooterBlock from "../blocks/Footer";

const uniqueBlocks = (value, { siblingData }) => {
    const navbars = siblingData?.layout?.filter(block => block.blockType === 'navbar') || [];
    const footers = siblingData?.layout?.filter(block => block.blockType === 'footer') || [];
    
    if (navbars.length > 1) {
        return 'Only one Navbar block is allowed';
      }
    
      if (footers.length > 1) {
        return 'Only one Footer block is allowed';
      }
    
      return true;
};


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
      validate: uniqueBlocks,
      blocks: [
        CardBlock,
        FormBlock,
        PhotoGalleryBlock,
        GridBlock,
        HeroBlock,
        TwoColumnsBlock,
        NavbarBlock,
        FooterBlock
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
