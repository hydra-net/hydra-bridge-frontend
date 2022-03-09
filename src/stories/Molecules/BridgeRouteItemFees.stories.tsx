import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import BridgeRouteItemFees from "../../common/components/Molecules/BridgeRouteList/BridgeRouteItemFees";

export default {
  title: "Molecules/BridgeRoutes/Fees",
  component: BridgeRouteItemFees,
} as ComponentMeta<typeof BridgeRouteItemFees>;

const Template: ComponentStory<typeof BridgeRouteItemFees> = (args) => (
  <Container maxWidth={theme.maxWidth.xs} noGutter={true}>
    <BridgeRouteItemFees {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  transactionCostInUsd: 0.39979797399225586,
  serviceTime: 300,
};
