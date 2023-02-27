import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FooterContentText } from "./FooterContentText";

export default {
  title: "Components/FooterContentText",
  component: FooterContentText,
  argTypes: {},
} as ComponentMeta<typeof FooterContentText>;

const Template: ComponentStory<typeof FooterContentText> = (args) => (
  <FooterContentText {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  announcements: [
    {
      title: "Update 16/12/2019: What we are doing",
      description:
        "Our committee aims to improve the quality of PYP and " +
        "to build a network to help with the improvement of the PYP for years to come. " +
        "Not only are we vetting through previous PYP solutions, we are creating a proper platform for " +
        "students to inform us of any corrections/adjustments on the solutions. So be prepared!",
    },
    {
      title: "Update 11/12/2019: Calling for Past Year Paper Solutions!",
      description:
        "Hope you are enjoying your holidays! We’re inviting students to write " +
        "AY19/20 Semester 1 exam solutions (a.k.a PYP solutions). Your help will be greatly " +
        "appreciated as the solution(s) will become valuable resources to many future exam candidates!",
    },
  ],
};
