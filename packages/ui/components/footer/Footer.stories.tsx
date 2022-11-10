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
        { label: "home", href: "/" , position: 12 },
        { label: "acads", href: "/acads", position: 13 },
        { label: "events", href: "/events", position: 14 },
        { label: "sponsors", href: "/sponsors", position: 15 },
        { label: "contact us", href: "/contact-us", position: 16 },
    ],
    vercelpoweredProps: {
        href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
        src: '/powered-by-vercel.svg',
        alt: 'Powered by Vercel Branding',
        width: 155,
        height: 155
    },
};

export const FooterContentButton = Template.bind({});
FooterContentButton.args = {
    links: [
        { label: "home", href: "/" , position: 12 },
        { label: "acads", href: "/acads", position: 13 },
        { label: "events", href: "/events", position: 14 },
        { label: "sponsors", href: "/sponsors", position: 15 },
        { label: "contact us", href: "/contact-us", position: 16 },
    ],
    vercelpoweredProps: {
        href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
        src: '/powered-by-vercel.svg',
        alt: 'Powered by Vercel Branding',
        width: 155,
        height: 155
    },
    contentButtonProps: {
        href: '#',
        title: "Want to work together or need help?",
        label: "Contact us",
    },
};


export const FooterContentText = Template.bind({});
FooterContentText.args = {
    links: [
        { label: "home", href: "/" , position: 12 },
        { label: "acads", href: "/acads", position: 13 },
        { label: "events", href: "/events", position: 14 },
        { label: "sponsors", href: "/sponsors", position: 15 },
        { label: "contact us", href: "/contact-us", position: 16 },
    ],
    vercelpoweredProps: {
        href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
        src: '/powered-by-vercel.svg',
        alt: 'Powered by Vercel Branding',
        width: 155,
        height: 155
    },
    contentTextProps: {
        alerts:[
            { title: "Update 16/12/2019: What we are doing",
                description: "Our committee aims to improve the quality of PYP and " +
                    "to build a network to help with the improvement of the PYP for years to come. " +
                    "Not only are we vetting through previous PYP solutions, we are creating a proper platform for " +
                    "students to inform us of any corrections/adjustments on the solutions. So be prepared!"
            },
            { title: "Update 11/12/2019: Calling for Past Year Paper Solutions!",
                description: "Hope you are enjoying your holidays! We’re inviting students to write " +
                    "AY19/20 Semester 1 exam solutions (a.k.a PYP solutions). Your help will be greatly " +
                    "appreciated as the solution(s) will become valuable resources to many future exam candidates!"
            },
        ]
    }
};

export const FooterContentBoth = Template.bind({});
FooterContentBoth.args = {
    links: [
        { label: "home", href: "/" , position: 12 },
        { label: "acads", href: "/acads", position: 13 },
        { label: "events", href: "/events", position: 14 },
        { label: "sponsors", href: "/sponsors", position: 15 },
        { label: "contact us", href: "/contact-us", position: 16 },
    ],
    vercelpoweredProps: {
        href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
        src: '/powered-by-vercel.svg',
        alt: 'Powered by Vercel Branding',
        width: 155,
        height: 155
    },
    contentButtonProps: {
        href: '#',
        title: "Want to work together or need help?",
        label: "Contact us",
    },
    contentTextProps: {
        alerts:[
            { title: "Update 16/12/2019: What we are doing",
                description: "Our committee aims to improve the quality of PYP and " +
                    "to build a network to help with the improvement of the PYP for years to come. " +
                    "Not only are we vetting through previous PYP solutions, we are creating a proper platform for " +
                    "students to inform us of any corrections/adjustments on the solutions. So be prepared!"
            },
            { title: "Update 11/12/2019: Calling for Past Year Paper Solutions!",
                description: "Hope you are enjoying your holidays! We’re inviting students to write " +
                    "AY19/20 Semester 1 exam solutions (a.k.a PYP solutions). Your help will be greatly " +
                    "appreciated as the solution(s) will become valuable resources to many future exam candidates!"
            },
        ]
    }
};