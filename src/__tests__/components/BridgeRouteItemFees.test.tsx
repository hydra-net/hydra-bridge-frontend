import React from "react";
import { render, screen } from "@testing-library/react";
import BridgeRouteItemFees, {
  BridgeRouteItemFeesProps,
} from "../../common/components/Molecules/BridgeRouteList/BridgeRouteItemFees";

describe("The Bridge route item fees", () => {
  it("should be defined and correctly calculated", async () => {
    const props: BridgeRouteItemFeesProps = {
      transactionCostInUsd: 0.39979797399225586,
      serviceTime: 300,
    };
    render(<BridgeRouteItemFees {...props} />);
    const element = screen.getByTestId("route-fees");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("gas-fee : ~ 0.40 $ | ~ 5 min");
  });

  it("should update correctly", async () => {
    const props: BridgeRouteItemFeesProps = {
      transactionCostInUsd: 0.39979797399225586,
      serviceTime: 300,
    };
    const { rerender } = render(<BridgeRouteItemFees {...props} />);
    const element = screen.getByTestId("route-fees");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("gas-fee : ~ 0.40 $ | ~ 5 min");

    rerender(
      <BridgeRouteItemFees
        transactionCostInUsd={3.2546656797399225586}
        serviceTime={1800}
      />
    );
    expect(element).toHaveTextContent("gas-fee : ~ 3.25 $ | ~ 30 min");
  });
});
