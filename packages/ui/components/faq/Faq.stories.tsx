import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Faq } from './Faq';

export default {
    title: 'Components/Faq',
    component: Faq,
    argTypes: {
    },
} as ComponentMeta<typeof Faq>;

const Template: ComponentStory<typeof Faq> = (args) => <Faq {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    qnaProps: {
        items: [
            { question: '', answer: '' },
            { question: '', answer: '' },
            { question: '', answer: '' },
            { question: '', answer: '' }
        ]
    }
};
