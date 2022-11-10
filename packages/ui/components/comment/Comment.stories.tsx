import React from "react";
import { Comment } from "./Comment";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: 'Components/Comment',
    component: Comment,
    argTypes: {

    }
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args}/>

export const Default = Template.bind({});
Default.args = {

};