import { CollectionConfig } from "payload/types";

/** Orders collection stores merch orders from users. */
const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    defaultColumns: ["id", "orderDateTime", "status", "updatedAt"],
    description: "Merchandise orders from users.",
  },
  fields: [
    // by default, payload generates an 'id' field each order automatically
    {
      name: "paymentGateway",
      type: "text",
      required: true,
    },
    // TODO(mrzzy): orderItems
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
  ],
};
export default Orders;
