import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import _ from "lodash";

import RouteList, {
  RouteListProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteList";

import { mockRouteListBaseProps } from "../../__mocks__/props/bridgeRoutes";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import QuoteResponseDtoMock from "../../__mocks__/fromResponse/QuoteResponseDto.json";

describe("The Bridge route list", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render with routes", async () => {
    const props: RouteListProps = mockRouteListBaseProps;

    const { asFragment } = render(<RouteList {...props} />);
    expect(asFragment()).toMatchSnapshot();
    render(<RouteList {...props} />);
  });

  it("should render the routes, when a error occurs", async () => {
    const quoteResponseWithOneRouteError = _.cloneDeep(QuoteResponseDtoMock);
    // @ts-ignore delete
    delete quoteResponseWithOneRouteError.routes[1].bridgeRoute;
    const props: RouteListProps = {
      ...mockRouteListBaseProps,
      routes: quoteResponseWithOneRouteError.routes,
    };
    const { container, asFragment } = render(<RouteList {...props} />);

    const routeWithoutError = container.querySelector<HTMLDivElement>(
      `#route-${props.routes[0].id}`
    );
    const routeWithError = screen.getByText(/errors.showing-route/);

    expect(asFragment()).toMatchSnapshot();
    expect(container.childElementCount).toBe(props.routes.length);
    expect(routeWithoutError).toBeInTheDocument();
    // @ts-ignore possible null
    expect(routeWithoutError.childElementCount).toBe(1);
    expect(routeWithError).toBeInTheDocument();
    expect(routeWithError).toHaveStyle(`color: ${theme.colors.red}`);
  });

  it("should render the routes, when all of them have errors", async () => {
    const quoteResponseWithAllRouteError = _.cloneDeep(QuoteResponseDtoMock);
    // @ts-ignore delete
    delete quoteResponseWithAllRouteError.routes[0].bridgeRoute;
    // @ts-ignore delete
    delete quoteResponseWithAllRouteError.routes[1].bridgeRoute;

    const props: RouteListProps = {
      ...mockRouteListBaseProps,
      routes: quoteResponseWithAllRouteError.routes,
    };
    const { container, asFragment } = render(<RouteList {...props} />);

    const routesWithError = screen.getAllByText(/errors.showing-route/);

    expect(asFragment()).toMatchSnapshot();
    expect(container.childElementCount).toBe(props.routes.length);
    routesWithError.forEach((route) => {
      expect(route).toBeInTheDocument();
      expect(route).toHaveStyle(`color: ${theme.colors.red}`);
    });
  });
});
