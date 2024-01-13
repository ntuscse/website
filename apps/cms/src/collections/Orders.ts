import { CollectionConfig } from 'payload/types';
import ImageCell from '../admin/components/ImageCell'
const Order: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: "order_person",
    group: "Merch",
  },
  // access: {
  //   read: () => true,
  //   create: () => true,
  //   update: () => true,
  //   delete: () => true,
  // },
  fields: [
    {
      name: 'order_id',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'order_person',
      type: 'text',
      required: true,
    },
    {
      name: 'product_image_url',
      type: 'text',
      required: true,
      admin: {
        components: {
          Cell: ImageCell
        }
      }
    },
    {
      name: 'item',
      type: 'text',
      required: true,
    },
    {
      name: 'qty',
      type: 'number',
      required: true,
    },
    {
      name: 'size',
      type: 'text',
      required: true,
    },
    {
      name: 'colour',
      type: 'text',
      required: true,
    },
    // ... additional fields
  ],
};

export default Order;
