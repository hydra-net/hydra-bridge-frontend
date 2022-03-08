import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";
import RouteItemFees from "../../common/components/Molecules/BridgeRoutes/RouteItemFees";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

export default {
  title: "Molecules/BridgeRoutes/Fees",
  component: RouteItemFees,
} as ComponentMeta<typeof RouteItemFees>;

const Template: ComponentStory<typeof RouteItemFees> = (args) => (
  <Container maxWidth={theme.maxWidth.xs} noGutter={true}>
    <RouteItemFees {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  transactionCostInUsd: 0.39979797399225586,
  serviceTime: 300,
};
