import { Block } from 'payload/types';

const FooterBlock: Block = {
  slug: 'footer',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          minRows: 1,
          fields: [
            {
              name: 'linkName',
              type: 'text',
              label: 'Link Name',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default FooterBlock;
