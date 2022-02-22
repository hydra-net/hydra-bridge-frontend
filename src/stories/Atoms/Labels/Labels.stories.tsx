import { InputLabel as StyledInputLabel } from "../../../common/components/Atoms/Label/Label";
import { ComponentStory } from "@storybook/react";
import React from "react";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

export default {
  title: "Atoms/Labels",
  components: { StyledInputLabel },
};

const TemplateInputLabel: ComponentStory<typeof StyledInputLabel> = (args) => (
  <StyledInputLabel {...args}>Hello</StyledInputLabel>
);
export const InputLabel = TemplateInputLabel.bind({});
InputLabel.args = {
  color: theme.colors.white,
  margin: `0 0 ${theme.margin.sm} 0`,
};
