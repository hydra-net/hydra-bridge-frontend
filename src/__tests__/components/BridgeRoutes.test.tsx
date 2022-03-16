import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import BridgeRoutes, {
  BridgeRoutesProps,
} from "../../common/components/Molecules/BridgeRoutes/BridgeRoutes";

import { mockBridgeRoutesBaseProps } from "../../__mocks__/props/bridgeRoutes";

describe("The Bridge routes", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly when not in progress and no error", async () => {
    const props: BridgeRoutesProps = mockBridgeRoutesBaseProps;

    const { container, asFragment } = render(<BridgeRoutes {...props} />);

    fireEvent.click(screen.getByRole("button"));
    const renderedRoutes =
      container.querySelectorAll<HTMLDivElement>(`[id^="route-"]`);

    expect(screen.getByText(/available-routes/)).toBeInTheDocument();
    expect(screen.getByText(props.routes.length)).toBeInTheDocument();
    expect(renderedRoutes.length).toBe(props.routes.length);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render the skeleton when in progress", async () => {
    const props: BridgeRoutesProps = {
      ...mockBridgeRoutesBaseProps,
      inProgress: true,
    };

    const { container, asFragment } = render(<BridgeRoutes {...props} />);

    fireEvent.click(screen.getByRole("button"));
    const renderedRoutes =
      container.querySelectorAll<HTMLDivElement>(`[id^="route-"]`);
    const skeletons = container.querySelectorAll<HTMLDivElement>(
      ".rectangle-skeleton"
    );

    expect(screen.getByText(/available-routes/)).toBeInTheDocument();
    expect(renderedRoutes.length).toBe(0);
    expect(skeletons.length).toBe(3);
    expect(asFragment()).toMatchSnapshot();
  });
});
