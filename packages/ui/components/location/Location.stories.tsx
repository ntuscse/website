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
    primary: true,
    label: 'Location',
};
