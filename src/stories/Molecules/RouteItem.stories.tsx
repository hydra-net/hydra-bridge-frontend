import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";
import RouteItem, {
  RouteItemProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteItem";
import RouteItemFees from "../../common/components/Molecules/BridgeRoutes/RouteItemFees";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

export default {
  title: "Molecules/BridgeRoutes/Item",
  component: RouteItem,
} as ComponentMeta<typeof RouteItem>;

const Template: ComponentStory<typeof RouteItem> = (args) => (
  <Container maxWidth={theme.maxWidth["5xl"]} noGutter={true}>
    <RouteItem {...args}>{args.children ? args.children : null}</RouteItem>
  </Container>
);

const baseArgs: RouteItemProps = {
  amountIn: "0.0001",
  amountOut: "0.0001",
  coinSymbol: "ethCoin",
  bridgeSymbol: "polygonBridge",
  bridgeDisplayName: "Polygon",
  routeId: 2,
  isSelected: false,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};

export const Default = Template.bind({});
Default.args = { ...baseArgs };

export const WithOverflowAmount = Template.bind({});
WithOverflowAmount.args = {
  ...baseArgs,
  amountIn: "0.00000001",
  amountOut: "0.00000001",
};

export const WithTransactionFees = Template.bind({});
WithTransactionFees.args = {
  ...baseArgs,
  children: (
    <RouteItemFees
      transactionCostInUsd={0.39979797399225586}
      serviceTime={300}
    />
  ),
};

export const Selected = Template.bind({});
Selected.args = {
  ...baseArgs,
  isSelected: true,
  amountIn: "0.001",
  amountOut: "0.001",
};
