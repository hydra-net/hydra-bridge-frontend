import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ReceiveDetailsAccordion from "../../../common/components/Atoms/ReceiveDetails/ReceiveDetailsAccordion";
import { mockReceiveDetailsProps } from "../../../__mocks__/props/receiveDetails";

export default {
  title: "Atoms/ReceiveDetails/Accordion",
  component: ReceiveDetailsAccordion,
} as ComponentMeta<typeof ReceiveDetailsAccordion>;

const Template: ComponentStory<typeof ReceiveDetailsAccordion> = (args) => (
  <ReceiveDetailsAccordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  amountOut: "",
};

export const Loading = Template.bind({});
Loading.args = {
  amountOut: "",
  isLoading: true,
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...mockReceiveDetailsProps,
};
