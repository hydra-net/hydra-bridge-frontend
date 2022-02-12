import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "../../../common/componentsV2/Atoms/Input/Input";

export default {
  title: "Atoms/Inputs/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "0.0",
  type: "text",
  additionalAttributes: {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "number",
  placeholder: "0.0",
  isDisabled: true,
  additionalAttributes: {
    min: 1,
    max: 30,
    pattern: "[0-9]",
  },
};
