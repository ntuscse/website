import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ["image/*"],
    disableLocalStorage: true,
  },
};
export default Media;
