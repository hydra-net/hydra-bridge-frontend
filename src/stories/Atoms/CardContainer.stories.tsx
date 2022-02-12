import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardContainer } from "../../common/components/componentsV2/Atoms/CardContainer/CardContainer";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

export default {
  title: "Atoms/CardContainer",
  component: CardContainer,
} as ComponentMeta<typeof CardContainer>;

const Template: ComponentStory<typeof CardContainer> = (args) => (
  <CardContainer {...args}>
    <h3 style={{ fontSize: theme.heading.sm, color: "white" }}>Hello</h3>
  </CardContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomBg = Template.bind({});
WithCustomBg.args = {
  bg: theme.colors.blue.lightest,
};

export const WithCustomMaxWidth = Template.bind({});
WithCustomMaxWidth.args = {
  maxWidth: theme.maxWidth.md,
};
