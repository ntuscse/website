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
    heading: 'Frequently Asked Questions',
    qnaList: [
        {
            question: 'What is the level required?',
            answer: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' +
                'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.'
        },
        {
            question: 'Level required?',
            answer: 'Lorem ipsum.'
        },
        {
            question: 'What is the level required?',
            answer: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' +
                'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.'
        },
        {
            question: 'What is the level required?',
            answer: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' +
                'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.'
        }
    ]

};
