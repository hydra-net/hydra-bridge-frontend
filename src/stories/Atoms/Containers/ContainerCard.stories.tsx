import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ContainerCard } from "../../../common/components/componentsV2/Atoms/Containers/Container";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

export default {
  title: "Atoms/Containers/ContainerCard",
  component: ContainerCard,
} as ComponentMeta<typeof ContainerCard>;

const Template: ComponentStory<typeof ContainerCard> = (args) => (
  <ContainerCard {...args}>
    <h3
      style={{
        fontSize: theme.heading.sm,
        color: "white",
      }}
    >
      Hello
    </h3>
  </ContainerCard>
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
