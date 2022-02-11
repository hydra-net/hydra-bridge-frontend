import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrimaryButton } from "../../../common/components/Buttons/ButtonV2";

export default {
  title: "Atoms/Buttons/PrimaryButton",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args}>Connect wallet</PrimaryButton>
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
