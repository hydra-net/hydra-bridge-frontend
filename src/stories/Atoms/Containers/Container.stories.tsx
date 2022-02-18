import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { sizes } from "../../../media";
import { ContainerType } from "../../../common/enums";
import { Container } from "../../../common/components/Atoms/Containers/Container";

export default {
  title: "Atoms/Containers/Container",
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} style={{ backgroundColor: theme.colors.blue.light }}>
    <h3
      style={{
        fontSize: theme.heading.sm,
        color: "white",
      }}
    >
      {/*@ts-ignore*/}
      Container type {args.type?.toUpperCase()} - ( {sizes[args.type]}px )
    </h3>
    <p style={{ fontSize: theme.paragraph.lg, color: "white" }}>
      withGutters: {args.noGutter ? "no" : "yes"}
    </p>
  </Container>
);

export const Default = Template.bind({});
Default.args = {};

export const LG = Template.bind({});
LG.args = {
  type: ContainerType.LG,
};

export const XL = Template.bind({});
XL.args = {
  type: ContainerType.XL,
};
export const XXL = Template.bind({});
XXL.args = {
  type: ContainerType.XXL,
};
export const XXXL = Template.bind({});
XXXL.args = {
  type: ContainerType.XXXL,
};

export const NoGutter = Template.bind({});
NoGutter.args = {
  type: ContainerType.LG,
  noGutter: true,
};
