import { CollectionConfig } from "payload/types";
import Media from "./Media";
import populateSlug from "./hooks/populateSlug";

const NavItems: CollectionConfig = {
  slug: "navbars",
  admin: {
    defaultColumns: ["logo"],
    useAsTitle: "title",
    group: "Content",
    preview: (doc, _options) => {
      if (doc?.slug) {
        return `${process.env.FRONTEND_STAGING_DOMAIN}/navbars/${doc.slug as string}`
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
        name: "logo",
        type: "upload",
        relationTo: Media.slug,
          // validation: only allow image filetypes
        filterOptions: {
          mimeType: { contains: "image" },
        },
      },
      {
        name: 'NavItems',
        type: 'array',
        maxRows: 5,
        fields: [
          {
            name: "label",
            type: "text",
          },
          {
            name: 'description',
            type: 'text',
            required: false,
          },
          {
            name: 'url',
            type: 'text',
            required: false,
          },
          {
            name: 'subnavItems',
            type: 'array',
            maxRows: 5,
            fields: [
              {
                name: 'subnavTitle',
                type: 'text',
              },
              {
                name: 'url',
                type: 'text',
                required: false,
              },
            ]
          },
          // sidebar stuff
        ],
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
        name: "slug",
        label: "Slug",
        type: "text",
        admin: {
          position: "sidebar",
          readOnly: true,
          description: "This is automatically generated from the label."
        },
        hooks: {
          beforeChange: [
            populateSlug
          ]
        }
      },
    ],
  };

  export default NavItems;
