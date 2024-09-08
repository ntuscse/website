import { CollectionConfig } from "payload/types";

/** Products collection stores merch products offerings. */
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    description: "Merchandise products offerings",
    defaultColumns: ["name", "category", "price", "is_available"],
  },
  fields: [
    // by default, payload generates an 'id' field each order automatically
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "colors",
      type: "text",
      required: true,
      hasMany: true,
    },
    {
      name: "sizes",
      type: "text",
      hasMany: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "is_available",
      label: "Is Available",
      type: "checkbox",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        step: 0.01,
      },
      min: 0,
    },
    {
      name: "category",
      type: "text",
      required: true,
      hasMany: true,
      minRows: 1,
    },
    {
      name: "size_chart",
      label: "Size Chart",
      type: "text",
    },
    {
      name: "stock",
      type: "array",
      fields: [
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
          name: "quantity",
          type: "number",
          admin: {
            step: 1,
          },
          required: true,
          min: 0,
        },
      ],
    },
  ],
};

export default Products;
