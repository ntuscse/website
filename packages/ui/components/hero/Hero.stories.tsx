import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hero } from "./Hero"

export default {
    title: 'Components/Hero',
    component: Hero,
    argTypes: {

    }
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundGradient: 'linear(to-r, blackAlpha.600, transparent)',
    text: 'WELCOME TO SCSE CLUB',
    buttons: [
        { label: 'LEARN MORE', href: '/learn', buttonType: 'primary.blue', size: 'lg' },
        { label: 'CONTACT US', href: '/contact', buttonType: 'primary.black', size: 'lg' },
    ],
};

export const WithoutContent = Template.bind({});
WithoutContent.args = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundGradient: 'linear(to-r, blackAlpha.600, transparent)'
};