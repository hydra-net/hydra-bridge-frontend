import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import RouteItem, {
  RouteItemProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteItem";

import { mockRouteItemBaseProps } from "../../__mocks__/props/bridgeRoutes";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

describe("The Bridge route item", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", async () => {
    const props: RouteItemProps = mockRouteItemBaseProps;

    const { asFragment } = render(<RouteItem {...props} />);
    expect(asFragment()).toMatchSnapshot();
    render(<RouteItem {...props} />);
  });

  it("should not be selected", async () => {
    const props: RouteItemProps = {
      ...mockRouteItemBaseProps,
    };
    render(<RouteItem {...props} />);
    const element = screen.getByRole("button");

    expect(element).toBeInTheDocument();
    expect(element.firstChild).toHaveStyle(
      `background-color: ${theme.colors.blue.darkest}`
    );
  });

  it("should be selected", async () => {
    const props: RouteItemProps = {
      ...mockRouteItemBaseProps,
      isSelected: true,
    };
    render(<RouteItem {...props} />);
    const element = screen.getByRole("button");

    expect(element).toBeInTheDocument();
    expect(element.firstChild).toHaveStyle(
      `background-color: ${theme.colors.blue.darker}`
    );
  });
});
