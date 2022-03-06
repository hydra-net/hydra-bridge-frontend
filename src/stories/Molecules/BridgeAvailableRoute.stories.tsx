import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import BridgeAvailableRoute from "../../common/components/Molecules/BridgeAvailableRoute/BridgeAvailableRoute";
import { Container } from "../../common/components/Atoms/Containers/Container";

export default {
  title: "Molecules/BridgeAvailableRoutes",
  component: BridgeAvailableRoute,
} as ComponentMeta<typeof BridgeAvailableRoute>;

const Template: ComponentStory<typeof BridgeAvailableRoute> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <BridgeAvailableRoute {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  coinSymbol: "ethCoin",
  networkSymbol: "polygonNetwork",
};
