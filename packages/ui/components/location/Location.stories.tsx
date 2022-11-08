import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Location } from './Location';

export default {
    title: 'Components/Location',
    component: Location,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} as ComponentMeta<typeof Location>;

const Template: ComponentStory<typeof Location> = (args) => <Location {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    src: "https://maps.google.com/maps?q=Nanyang%20Technological%20University&amp;t=m&amp;z=12&amp;output=embed&amp;iwloc=near",
    title: "Nanyang Technological University"
};
