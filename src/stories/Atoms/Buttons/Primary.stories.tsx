import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrimaryButton } from "../../../common/components/Atoms/Buttons/Button";

export default {
  title: "Atoms/Buttons/PrimaryButton",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args}>Input amount</PrimaryButton>
);

export const Default = Template.bind({});
Default.args = {};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  isDisabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  iconName: "cutArrowRight",
};
