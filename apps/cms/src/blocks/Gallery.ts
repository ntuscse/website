import { Block, Field } from "payload/types";

const PhotoGalleryImage: Field = {
  name: "images",
  type: "array",
  label: "Images",
  minRows: 1,
  labels: {
    singular: "Image",
    plural: "Images",
  },
  fields: [
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

export const PhotoGalleryBlock: Block = {
  slug: "photo-gallery",
  labels: {
    singular: "Photo Gallery",
    plural: "Photo Galleries",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Section Subtitle",
    },
    PhotoGalleryImage,
  ],
};
