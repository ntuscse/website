import { Block, Field } from "payload/types";

const TwoColumnsItem: Field = {
  name: "items",
  type: "array",
  label: "Two Columns Section",
  minRows: 1,
  labels: {
    singular: "Item",
    plural: "Items",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media", // check MEDIA
      required: true,
    },
  ],
};

export const TwoColumnsBlock: Block = {
  slug: "two-columns",
  labels: {
    singular: "Two Columns",
    plural: "Two Columns Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
    },
    TwoColumnsItem,
    {
      name: "layout",
      type: "select",
      label: "Layout",
      required: true,
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Reverse",
          value: "reverse",
        },
      ],
      defaultValue: "default",
    },
  ],
};
