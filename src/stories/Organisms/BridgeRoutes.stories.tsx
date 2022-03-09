import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "../../common/components/Atoms/Containers/Container";
import BridgeRoutes, {
  BridgeRoutesProps,
} from "../../common/components/Molecules/BridgeRoutes/BridgeRoutes";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { QuoteResponseDto } from "../../common/dtos";
import QuoteResponseDtoMock from "../../__mocks__/fromResponse/QuoteResponseDto.json";

export default {
  title: "Organisms/BridgeRoutes",
  component: BridgeRoutes,
} as ComponentMeta<typeof BridgeRoutes>;

const Template: ComponentStory<typeof BridgeRoutes> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <BridgeRoutes {...args} />
  </Container>
);

const quoteResponse: QuoteResponseDto = QuoteResponseDtoMock;
const baseArgs: BridgeRoutesProps = {
  routes: quoteResponse.routes,
  selectedRouteId: quoteResponse.routes[0].id,
  inProgress: false,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};

export const Default = Template.bind({});
Default.args = { ...baseArgs };

export const Loading = Template.bind({});
Loading.args = { ...baseArgs, inProgress: true, routes: [] };
