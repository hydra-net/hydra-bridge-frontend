import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "../../common/components/Atoms/Input/Input";

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

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: "0.0",
  type: "text",
  value: "0.003",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Country",
};

export const WithErrorWithText = Template.bind({});
WithErrorWithText.args = {
  placeholder: "0.0",
  type: "text",
  hasError: true,
  errorText: "Invalid amount",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Country",
};
