import React from "react";
import { cleanup, render } from "@testing-library/react";
import RouteItemFees, {
  RouteItemFeesProps,
} from "../../common/components/Molecules/BridgeRoutes/RouteItemFees";

describe("The Bridge route item fees", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", async () => {
    const props: RouteItemFeesProps = {
      transactionCostInUsd: 0.39979797399225586,
      serviceTime: 300,
    };

    const { asFragment } = render(<RouteItemFees {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be defined and correctly calculated", async () => {
    const props: RouteItemFeesProps = {
      transactionCostInUsd: 0.39979797399225586,
      serviceTime: 300,
    };
    const { container } = render(<RouteItemFees {...props} />);
    const element = container.querySelector("p");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("gas-fee : ~ 0.40 $ | ~ 5 min");
  });

  it("should update correctly", async () => {
    const props: RouteItemFeesProps = {
      transactionCostInUsd: 0.39979797399225586,
      serviceTime: 300,
    };
    const { container, rerender } = render(<RouteItemFees {...props} />);
    const element = container.querySelector("p");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("gas-fee : ~ 0.40 $ | ~ 5 min");

    rerender(
      <RouteItemFees
        transactionCostInUsd={3.2546656797399225586}
        serviceTime={1800}
      />
    );
    expect(element).toHaveTextContent("gas-fee : ~ 3.25 $ | ~ 30 min");
  });
});
