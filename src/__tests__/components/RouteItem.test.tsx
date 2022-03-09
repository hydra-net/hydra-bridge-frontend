import React from "react";
import { render, screen } from "@testing-library/react";
import RouteItem, {
  RouteItemProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteItem";
import { mockRouteItemBaseProps } from "../../__mocks__/props/bridgeRoutes";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

describe("The Bridge route item", () => {
  it("should be defined", async () => {
    const props: RouteItemProps = mockRouteItemBaseProps;
    render(<RouteItem {...props} />);
    const element = screen.getByRole("button");
    const firstAmount = screen.getByTestId("route-first-amount");
    const firstArrowIcon = screen.getByTestId("route-first-arrow-icon");
    const bridgeChain = screen.getByTestId("route-bridge-chain");
    const secondArrowIcon = screen.getByTestId("route-second-arrow-icon");
    const secondAmount = screen.getByTestId("route-second-amount");

    expect(element).toBeInTheDocument();
    expect(firstAmount.childElementCount).toBe(2);
    expect(firstAmount.firstChild).toHaveClass("amount__icon");
    expect(firstAmount.children[1].textContent).toBe(props.amountIn);

    expect(firstArrowIcon).toHaveClass("arrow__icon");

    expect(bridgeChain.firstChild).toHaveClass("bridge__icon");
    expect(bridgeChain.firstChild).toHaveTextContent(
      props.bridgeDisplayName.toLocaleLowerCase()
    );

    expect(bridgeChain.children[1]).toHaveTextContent(props.bridgeDisplayName);
    expect(bridgeChain.children[1]).toHaveClass("bridge__name");

    expect(secondArrowIcon).toHaveClass("arrow__icon");

    expect(secondAmount.childElementCount).toBe(2);
    console.log(secondAmount.hasAttribute("rtl"));
    expect(secondAmount.firstChild).toHaveClass("amount__icon");
    expect(secondAmount.children[1].textContent).toBe(props.amountOut);
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
