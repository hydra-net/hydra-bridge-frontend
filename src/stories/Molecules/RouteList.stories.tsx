import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import _ from "lodash";

import { Container } from "../../common/components/Atoms/Containers/Container";
import RouteList, {
  RouteListProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteList";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { QuoteResponseDto } from "../../common/dtos";
import QuoteResponseDtoMock from "../../__mocks__/fromResponse/QuoteResponseDto.json";

export default {
  title: "Molecules/BridgeRoutes/List",
  component: RouteList,
} as ComponentMeta<typeof RouteList>;

const Template: ComponentStory<typeof RouteList> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <RouteList {...args} />
  </Container>
);

const quoteResponse: QuoteResponseDto = QuoteResponseDtoMock;
const baseArgs: RouteListProps = {
  routes: quoteResponse.routes,
  selectedRouteId: quoteResponse.routes[0].id,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};

export const Default = Template.bind({});
Default.args = { ...baseArgs };

const quoteResponseWithOneRouteError = _.cloneDeep(quoteResponse);
// @ts-ignore delete
delete quoteResponseWithOneRouteError.routes[1].bridgeRoute;
export const WithOneRouteError = Template.bind({});
WithOneRouteError.args = {
  ...baseArgs,
  routes: quoteResponseWithOneRouteError.routes,
};

const quoteResponseWithAllRouteError = _.cloneDeep(quoteResponse);
// @ts-ignore delete
delete quoteResponseWithAllRouteError.routes[0].bridgeRoute;
// @ts-ignore delete
delete quoteResponseWithAllRouteError.routes[1].bridgeRoute;

export const WithAllRouteErrors = Template.bind({});
WithAllRouteErrors.args = {
  ...baseArgs,
  routes: quoteResponseWithAllRouteError.routes,
};
