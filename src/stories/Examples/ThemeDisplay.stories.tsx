import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { stakenetTheme } from "../../shell/theme/stakenetTheme";
import ThemeDisplay from "./ThemeDisplay";

export default {
  title: "Theme/ThemeDisplay",
  component: ThemeDisplay,
} as ComponentMeta<typeof ThemeDisplay>;

const Template: ComponentStory<typeof ThemeDisplay> = (args) => (
  <ThemeDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...stakenetTheme,
};
