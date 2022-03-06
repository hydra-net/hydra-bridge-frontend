import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import BridgeRouteItem, {
  BridgeRouteItemProps,
} from "../../common/components/Molecules/BridgeRouteList/BridgeRouteItem";
import BridgeRouteItemFees from "../../common/components/Molecules/BridgeRouteList/BridgeRouteItemFees";

export default {
  title: "Molecules/BridgeRoutes/Item",
  component: BridgeRouteItem,
} as ComponentMeta<typeof BridgeRouteItem>;

const Template: ComponentStory<typeof BridgeRouteItem> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <BridgeRouteItem {...args}>
      {args.children ? args.children : null}
    </BridgeRouteItem>
  </Container>
);

const baseArgs: BridgeRouteItemProps = {
  amountIn: "0.0001",
  amountOut: "0.0001",
  coinSymbol: "ethCoin",
  networkSymbol: "polygonNetwork",
  networkDisplayName: "Polygon",
  routeId: 2,
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
    <BridgeRouteItemFees
      transactionCostInUsd={0.39979797399225586}
      serviceTime={300}
    />
  ),
};
