import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";

import { IconKeys } from "../../common/commonTypes";
import { getBridgeIconName } from "../../helpers/bridgeHelper";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import BridgeRouteItem, {
  BridgeRouteItemProps,
} from "../../common/components/Molecules/BridgeRouteList/BridgeRouteItem";

export default {
  title: "Molecules/BridgeRoutes/Item",
  component: BridgeRouteItem,
} as ComponentMeta<typeof BridgeRouteItem>;

const Template: ComponentStory<typeof BridgeRouteItem> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <BridgeRouteItem {...args} />
  </Container>
);

const baseArgs: BridgeRouteItemProps = {
  amountIn: "0.0001",
  amountOut: "0.0001",
  coinSymbol: "ethCoin",
  networkSymbol: `${getBridgeIconName("polygon-bridge")}Network` as IconKeys,
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
