import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import _ from "lodash";

import { Container } from "../../common/components/Atoms/Containers/Container";
import RouteList from "../../common/components/Molecules/BridgeRoutes/RouteList";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import QuoteResponseDtoMock from "../../__mocks__/fromResponse/QuoteResponseDto.json";
import { mockRouteListBaseProps } from "../../__mocks__/props/bridgeRoutes";

export default {
  title: "Molecules/BridgeRoutes/List",
  component: RouteList,
} as ComponentMeta<typeof RouteList>;

const Template: ComponentStory<typeof RouteList> = (args) => (
  <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
    <RouteList {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = { ...mockRouteListBaseProps };

const quoteResponseWithOneRouteError = _.cloneDeep(QuoteResponseDtoMock);
// @ts-ignore delete
delete quoteResponseWithOneRouteError.routes[1].bridgeRoute;
export const WithOneRouteError = Template.bind({});
WithOneRouteError.args = {
  ...mockRouteListBaseProps,
  routes: quoteResponseWithOneRouteError.routes,
};

const quoteResponseWithAllRouteError = _.cloneDeep(QuoteResponseDtoMock);
// @ts-ignore delete
delete quoteResponseWithAllRouteError.routes[0].bridgeRoute;
// @ts-ignore delete
delete quoteResponseWithAllRouteError.routes[1].bridgeRoute;

export const WithAllRouteErrors = Template.bind({});
WithAllRouteErrors.args = {
  ...mockRouteListBaseProps,
  routes: quoteResponseWithAllRouteError.routes,
};
