import { CollectionConfig } from "payload/types";
import Media from "./Media";

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
  fields: [
    // by default, payload generates an 'id' field each order automatically
    {
      name: "paymentGateway",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Order Status",
      type: "select",
      options: [
        {
          value: "1",
          label: "Pending Payment",
        },
        {
          value: "2",
          label: "Payment Completed",
        },
        {
          value: "3",
          label: "Order Completed",
        },
      ],
      required: true,
    },
    {
      name: "customerEmail",
      type: "email",
      required: true,
    },
    {
      name: "transactionID",
      label: "Transaction ID",
      admin: {
        description: "Transaction ID provided by Payment Gateway",
      },
      type: "text",
      required: true,
    },
    {
      name: "orderDateTime",
      label: "Ordered On",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      required: true,
    },
    // ordered items for this order
    {
      name: "orderItems",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: Media.slug,
          // validation: only allow image filetypes
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          name: "quantity",
          type: "number",
          required: true,
        },
        {
          name: "size",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "colorway",
          type: "text",
          required: true,
        },
      ],
      // direct paylaod to generate a OrderItem type
      interfaceName: "OrderItem",
      // validate: orders should not be empty
      minRows: 1,
    },
  ],
};
export default Orders;
