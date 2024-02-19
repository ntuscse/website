import { CollectionConfig } from 'payload/types'
import { Hero } from '../blocks/Hero';
import TwoColumn from '../blocks/TwoColumn';

const Pages: CollectionConfig = {
    slug: 'pages',
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true,
        },
        {
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            blocks: [
                Hero, TwoColumn
            ]
        },
    ],
}

export default Pages;
