import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";
import RouteItem from "../../common/components/Molecules/BridgeRoutes/RouteItem";
import RouteItemFees from "../../common/components/Molecules/BridgeRoutes/RouteItemFees";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { routeItemBaseProps } from "../../__mocks__/props/bridgeRoutes";

export default {
  title: "Molecules/BridgeRoutes/Item",
  component: RouteItem,
} as ComponentMeta<typeof RouteItem>;

const Template: ComponentStory<typeof RouteItem> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <RouteItem {...args}>{args.children ? args.children : null}</RouteItem>
  </Container>
);

export const Default = Template.bind({});
Default.args = { ...routeItemBaseProps };

export const WithOverflowAmount = Template.bind({});
WithOverflowAmount.args = {
  ...routeItemBaseProps,
  amountIn: "0.00000001",
  amountOut: "0.00000001",
};

export const WithTransactionFees = Template.bind({});
WithTransactionFees.args = {
  ...routeItemBaseProps,
  children: (
    <RouteItemFees
      transactionCostInUsd={0.39979797399225586}
      serviceTime={300}
    />
  ),
};

export const Selected = Template.bind({});
Selected.args = {
  ...routeItemBaseProps,
  isSelected: true,
  amountIn: "0.001",
  amountOut: "0.001",
};
