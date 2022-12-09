import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryBlue = Template.bind({});
PrimaryBlue.args = {
  label: 'CLICK ME',
  href: '#',
  size: 'lg',
  buttonType: 'primary.blue',
};

export const PrimaryBlack = Template.bind({});
PrimaryBlack.args = {
  label: 'CLICK ME',
  href: '#',
  size: 'lg',
  buttonType: 'primary.black',
};