import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconKeys } from "../../../common/components/Atoms/Icons/Icon";
import ReceiveDetailsAccordion from "../../../common/components/Atoms/ReceiveDetails/ReceiveDetailsAccordion";

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
  iconKey: "hopChain" as IconKeys,
  chainName: "Hop",
  gasFees: 0.39979797399225586,
  serviceTime: 800,
  transactionFees: "0",
  slippage: "0.00001 ETH",
  amountOut: "0.00001 ETH",
};
