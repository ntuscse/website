import { Block } from "payload/types";

const CardBlock: Block = {
  slug: "card",
  labels: {
    singular: "Card",
    plural: "Cards",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media", // check MEDIA
      required: true,
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
      required: true,
    },
  ],
};

export default CardBlock;
