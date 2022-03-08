import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Accordion from "../../common/components/Molecules/Accordion/Accordion";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { FlexWrapper } from "../../common/components/Atoms/Wrappers/Wrapper";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";
import RoundedBubble from "../../common/components/Atoms/RoundedBubble/RoundedBubble";

export default {
  title: "Molecules/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <div style={{ maxWidth: theme.maxWidth.lg }}>
    <Accordion {...args}>Connect wallet</Accordion>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  header: (
    <FlexWrapper
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Label margin={"0"}>Hello</Label>
      <RoundedBubble>3</RoundedBubble>
    </FlexWrapper>
  ),
  content: <div>HELLO</div>,
};
