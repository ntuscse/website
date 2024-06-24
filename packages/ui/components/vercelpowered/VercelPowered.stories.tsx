import { type Meta, type StoryFn } from "@storybook/react";

import { VercelPowered } from "./VercelPowered";

export default {
  title: "Components/VercelPowered",
  component: VercelPowered,
  argTypes: {},
} as Meta<typeof VercelPowered>;

const Template: StoryFn<typeof VercelPowered> = (args) => (
  <VercelPowered {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  href: "https://vercel.com/?utm_source=cse-it&&utm_campaign=oss",
  src: "/powered-by-vercel.svg",
  alt: "Powered by Vercel Branding",
  width: 155,
  height: 155,
};
