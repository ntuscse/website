import { type Meta, type StoryFn } from "@storybook/react";
import { NavBar } from "./NavBar";

export default {
  title: "Components/NavBar",
  component: NavBar,
  argTypes: {},
} as Meta<typeof NavBar>;

const Template: StoryFn<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { label: "Home", href: "/" },
    { label: "Academics", href: "/academics" },
    { label: "Events", href: "/events" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Contact", href: "/contact" },
  ],
  logoProps: {
    src: "/scse-logo/scse-logo-blue.png",
    alt: "scse logo",
  },
};
