import { Block, Field } from "payload/types";

const HeroTitle: Field = {
  name: 'title',
  type: 'text',
  label: 'Title',
  required: true,
}

const HeroImage: Field = {
  name: 'image',
  type: 'upload',
  label: 'Image',
  relationTo: 'media', // check MEDIA
  required: true,
}

const HeroDescription: Field = {
  name: 'description',
  type: 'textarea',
  label: 'Description',
  required: true,
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    HeroTitle,
    HeroImage,
    HeroDescription,
  ]
}
