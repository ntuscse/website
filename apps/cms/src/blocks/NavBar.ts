import { Block } from 'payload/types';

const NavbarBlock: Block = {
  slug: 'navbar',
  labels: {
    singular: 'Navbar',
    plural: 'Navbars',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection for image uploads
      required: true,
      label: 'Logo',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'subnavItems',
          type: 'array',
          label: 'Sub-navigation Items',
          minRows: 1,
          fields: [
            {
              name: 'subnavTitle',
              type: 'text',
              label: 'Sub-navigation Title',
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
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
    },
  ],
};

export default NavbarBlock;
