import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Map } from "./Map";

export default {
  title: "Components/Map",
  component: Map,
  argTypes: {},
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = (args) => <Map {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Nanyang Technological University",
};
