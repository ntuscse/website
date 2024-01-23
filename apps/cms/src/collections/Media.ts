import { CollectionConfig } from "payload/types";
import { isUsingCloudStore } from "../utilities/cloud";

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
    // disable local storage of media assets if using cloud storage
    // otherwise allow local storage for local development
    disableLocalStorage: isUsingCloudStore(),
  },
};
export default Media;
