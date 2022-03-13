import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Accordion from "../../common/components/Molecules/Accordion/Accordion";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { FlexWrapper } from "../../common/components/Atoms/Wrappers/Wrapper";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";
import RoundedBubble from "../../common/components/Atoms/RoundedBubble/RoundedBubble";
import ReceiveDetails from "../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import { IconKeys } from "../../common/commonTypes";
import {
  AccordionHeader,
  ReceiveDetailsAccordionHeader,
} from "../../common/components/Molecules/Accordion/AccordionHeaders";
import { AccordionContent } from "../../common/components/Molecules/Accordion/styles";

export default {
  title: "Molecules/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <div style={{ maxWidth: theme.maxWidth["5xl"] }}>
    <Accordion {...args}>Connect wallet</Accordion>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  header: (
    <AccordionHeader>
      <FlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Label margin={"0"} style={{ width: "100%" }}>
          Available routes
        </Label>
        <RoundedBubble>3</RoundedBubble>
      </FlexWrapper>
    </AccordionHeader>
  ),
  content: (
    <AccordionContent>
      <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>Hello</h1>
    </AccordionContent>
  ),
};

const receiveDetailsProps = {
  iconKey: "hopBridge" as IconKeys,
  chainName: "Hop",
  gasFees: 0.39979797399225586,
  serviceTime: 800,
  transactionFees: "0.00001 ETH",
  slippage: "0.00001 ETH",
  amountOut: "0.00001 ETH",
};
export const AsReceiveDetails = Template.bind({});
AsReceiveDetails.args = {
  bg: theme.colors.gray.darkest,
  shouldTriggerToggle: true,
  header: (
    <ReceiveDetailsAccordionHeader isOpen={true}>
      <FlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Label margin={"0"} style={{ width: "100%" }}>
          0.0001
        </Label>
        <p
          style={{ fontSize: "1.4rem", color: "white", margin: "0 0 0 .4rem" }}
        >
          ~$36.53
        </p>
      </FlexWrapper>
    </ReceiveDetailsAccordionHeader>
  ),
  content: (
    <AccordionContent padding={"0 1.6rem 1.6rem 1.6rem"}>
      <ReceiveDetails {...receiveDetailsProps} />
    </AccordionContent>
  ),
};
