import { CollectionConfig } from "payload/types";

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
    // order items
    {
      name: "items",
      type: "array",
      fields: [
        // by default, payload generates an 'id' field each order automatically
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "image",
          type: "text",
        },
        {
          name: "color",
          type: "text",
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
          name: "quantity",
          type: "number",
          required: true,
        },
      ],
      // direct paylaod to generate a OrderItem type
      interfaceName: "OrderItem",
      // validate: orders should not be empty
      minRows: 1,
    },
    {
      name: "transactionId",
      label: "Transaction ID",
      admin: {
        description: "Transaction ID provided by Payment Gateway",
      },
      type: "text",
      required: true,
    },
    {
      name: "transactionTime",
      label: "Transaction Time",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      required: true,
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "text",
      required: true,
    },
    {
      name: "customerEmail",
      label: "Customer Email",
      type: "email",
      required: true,
    },
    {
      name: "status",
      label: "Order Status",
      type: "select",
      options: [
        {
          value: "pending",
          label: "Pending Payment",
        },
        {
          value: "paid",
          label: "Payment Completed",
        },
        {
          value: "delivered",
          label: "Order Completed",
        },
      ],
      required: true,
    },
  ],
};
export default Orders;
