import { type Meta, type StoryFn } from "@storybook/react";

import { Map } from "./Map";

export default {
  title: "Components/Map",
  component: Map,
  argTypes: {},
} as Meta<typeof Map>;

const Template: StoryFn<typeof Map> = (args) => <Map {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Nanyang Technological University",
};
