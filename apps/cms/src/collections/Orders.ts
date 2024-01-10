import { CollectionConfig } from 'payload/types';

const Order: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: "Order Person",
    group: "Merch",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
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
      name: 'image_url',
      type: 'text',
      required: true,
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
