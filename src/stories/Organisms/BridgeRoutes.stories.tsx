import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";
import BridgeRoutes from "../../common/components/Molecules/BridgeRoutes/BridgeRoutes";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { mockBridgeRoutesBaseProps } from "../../__mocks__/props/bridgeRoutes";

export default {
  title: "Organisms/BridgeRoutes",
  component: BridgeRoutes,
} as ComponentMeta<typeof BridgeRoutes>;

const Template: ComponentStory<typeof BridgeRoutes> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <BridgeRoutes {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = { ...mockBridgeRoutesBaseProps };

export const Loading = Template.bind({});
Loading.args = { ...mockBridgeRoutesBaseProps, inProgress: true, routes: [] };
