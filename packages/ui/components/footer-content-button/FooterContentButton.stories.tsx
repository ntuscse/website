import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FooterContentButton } from "./FooterContentButton";

export default {
  title: "Components/FooterContentButton",
  component: FooterContentButton,
  argTypes: {},
} as ComponentMeta<typeof FooterContentButton>;

const Template: ComponentStory<typeof FooterContentButton> = (args) => (
  <FooterContentButton {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  href: "#",
  title: "Want to work together or need help?",
  label: "Contact us",
};
