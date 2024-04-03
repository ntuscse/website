import { type Meta, type StoryFn } from "@storybook/react";

import { ButtonLink } from "./ButtonLink";

export default {
  title: "Components/ButtonLink",
  component: ButtonLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof ButtonLink>;

const Template: StoryFn<typeof ButtonLink> = (args) => <ButtonLink {...args} />;

export const PrimaryBlue = Template.bind({});
PrimaryBlue.args = {
  label: "CLICK ME",
  href: "#",
  size: "lg",
  variant: "primary-blue",
};

export const PrimaryBlack = Template.bind({});
PrimaryBlack.args = {
  label: "CLICK ME",
  href: "#",
  size: "lg",
  variant: "primary-black",
};
