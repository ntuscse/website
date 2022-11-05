import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavBar } from "./NavBar"

export default {
    title: 'Components/NavBar',
    component: NavBar,
    argTypes: {

    }
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    links: [
        {label: "Home", href: "/"},
        {label: "Academics", href: "/academics"},
        {label: "Events", href: "/events"},
        {label: "Sponsors", href: "/sponsors"},
        {label: "Contact", href: "/contact"},
    ],
    logoProps: {
        src: "/scse-logo.png",
        alt: "scse logo",
        text: "NTU School of Computer Science & Engineering Club"
    }
};
