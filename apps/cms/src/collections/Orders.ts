import { CollectionConfig } from "payload/types";
import { OrderSchema } from "types";
import { toPayloadZod } from "../utilities/zodInteropt";


/** Orders collection stores merch orders from users. */
const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    defaultColumns: [
      "id",
      "orderItems",
      "orderDateTime",
      "status",
      "updatedAt",
    ],
    description: "Merchandise orders from users.",
  },
  fields: toPayloadZod(OrderSchema),
};
export default Orders;
