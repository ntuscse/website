import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from './Footer';

export default {
    title: 'Components/Footer',
    component: Footer,
    argTypes: {

    },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    links: [
        { label: "Home", href: "/" , position: 12 },
        { label: "Academics", href: "/academics", position: 13 },
        { label: "Events", href: "/events", position: 14 },
        { label: "Sponsors", href: "/sponsors", position: 15 },
        { label: "Contact", href: "/contact", position: 16 },
    ],
    vercelpoweredProps: {
        href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
        src: '/powered-by-vercel.svg',
        alt: 'Powered by Vercel Branding',
        width: 155,
        height: 155
    },
};
