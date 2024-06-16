import { Block, Field } from "payload/types";

const FormField: Field = {
  name: "fields",
  type: "array",
  label: "Form Fields",
  minRows: 1,
  labels: {
    singular: "Field",
    plural: "Fields",
  },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Field Label",
      required: true,
    },
    {
      name: "name",
      type: "text",
      label: "Field Name",
      required: true,
    },
    {
      name: "type",
      type: "select",
      label: "Field Type",
      required: true,
      options: [
        {
          label: "Text",
          value: "text",
        },
        {
          label: "Textarea",
          value: "textarea",
        },
        {
          label: "Select",
          value: "select",
        },
        {
          label: "Checkbox",
          value: "checkbox",
        },
      ],
    },
    {
      name: "required",
      type: "checkbox",
      label: "Required Field",
    },
  ],
};

export const FormBlock: Block = {
  slug: "form",
  labels: {
    singular: "Form",
    plural: "Forms",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Form Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Form Description",
    },
    FormField,
  ],
};
