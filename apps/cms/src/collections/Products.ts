import { CollectionConfig } from "payload/types";

/** Products collection stores merch products offerings. */
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    description: "Merchandise products offerings",
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
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Black",
          value: "black",
        },
        {
          label: "White",
          value: "white",
        },
        {
          label: "Blue",
          value: "blue",
        },
      ],
    },
    {
      name: "sizes",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Small",
          value: "s",
        },
        {
          label: "Medium",
          value: "m",
        },
        {
          label: "Large",
          value: "l",
        },
        {
          label: "Extra Large",
          value: "xl",
        },
      ],
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
      type: "select",
      required: true,
      options: [
        {
          label: "Shirt",
          value: "shirt",
        },
        {
          label: "Hat",
          value: "hat",
        },
      ],
    },
    {
      name: "size_chart",
      type: "text",
    },
    {
      name: "stock",
      type: "array",
      fields: [
        {
          name: "color",
          type: "select",
          options: ["black", "white", "blue"],
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
