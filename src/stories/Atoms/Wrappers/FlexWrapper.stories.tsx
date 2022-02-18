import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FlexWrapper } from "../../../common/components/Atoms/Wrappers/Wrapper";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

export default {
  title: "Atoms/FlexWrappers/Default",
  component: FlexWrapper,
  argTypes: {
    inlineFlex: { control: "radio", options: [true, false] },
    flexDirection: { control: "select", options: ["row", "column"] },
    alignItems: {
      control: "select",
      options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
    },
    justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    flex: {
      control: "select",
      options: ["1 1 0%", "1 1 auto", "0 1 auto", "none"],
    },
  },
} as ComponentMeta<typeof FlexWrapper>;

const Template: ComponentStory<typeof FlexWrapper> = (args) => (
  <FlexWrapper {...args}>
    <h4 style={{ fontSize: theme.heading.md, color: "white" }}>Hello</h4>
    <p style={{ fontSize: theme.paragraph.md, color: "white" }}>
      orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor
    </p>
  </FlexWrapper>
);

export const Default = Template.bind({});
Default.args = {};
