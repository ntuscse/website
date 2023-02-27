import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BlogCard } from "./BlogCard";

export default {
  title: "Components/BlogCard",
  component: BlogCard,
  argTypes: {},
} as ComponentMeta<typeof BlogCard>;

const Template: ComponentStory<typeof BlogCard> = (args) => (
  <BlogCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  link: "/#",
  blogCardImageProps: {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "unsplash image",
  },
  blogCardContentProps: {
    title: "TECHTERVIEW 101: NAVIGATING THE INTERNSHIP WORLD",
    body: "Techterview 101: Navigating the Internship World, a senior sharing event for the SCSE students took place on the 24th of February 2022. …",
    date: "February 22, 2022",
  },
};
