import { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: 'Media',
        plural: 'Media',
    },
    upload: true,
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            label: 'alt',
            type: 'text',
            required: true,
        },
    ],
}

export default Media;
