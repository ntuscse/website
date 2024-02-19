import { CollectionConfig } from "payload/types";
import { RowLabel } from "payload/types";
import NavbarView from "../fields/navbar/NavbarView";

const Website : CollectionConfig = {
  slug: "WebsiteBuilder",
  fields: [
    {
      name: 'slider', // required
      type: 'array', // required
      label: 'Navbar',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'CardSlider', // optional
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        // required
        {
          name: 'navTitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'subnav',
          type: 'array',
          label: 'Subnav',
          maxRows: 5,
          fields: [
            {
              name: 'subnavTitle',
              type: 'text',
            },
            {
              name: 'URL',
              type: 'text',
              required: false,
            }
          ]
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.title || `Nav field ${String(index).padStart(2, '0')}`
          },
          Cell: NavbarView,
        },
      },
    },
  ],
};

export default Website;
