import { Block } from "payload/types";
import CardBlock from "./Card"; // import card block

const GridBlock: Block = {
  slug: "grid",
  labels: {
    singular: "Grid",
    plural: "Grids",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
    },
    {
      name: "layout",
      type: "select",
      label: "Grid Layout",
      required: true,
      options: [
        {
          label: "One Column",
          value: "one-column",
        },
        {
          label: "Two Columns",
          value: "two-columns",
        },
        {
          label: "Three Columns",
          value: "three-columns",
        },
        {
          label: "Four Columns",
          value: "four-columns",
        },
      ],
      defaultValue: "two-columns",
    },
    {
      name: "cards",
      type: "array",
      label: "Cards",
      minRows: 1,
      fields: CardBlock.fields, // Reuse the fields defined in the CardBlock
    },
  ],
};

export default GridBlock;
