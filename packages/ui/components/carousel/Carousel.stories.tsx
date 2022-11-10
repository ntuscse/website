import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CarouselSpace } from './CarouselSpace';

export default {
    title: 'Components/Carousel',
    component: CarouselSpace,
    argTypes: {
    },
} as ComponentMeta<typeof CarouselSpace>;

const Template: ComponentStory<typeof CarouselSpace> = (args) => <CarouselSpace {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    chakraUICarouselProps: {
        items: [
            { src:'sadf', href:'sfsaf', alt: 'sdfs'}
        ]
    }
};
