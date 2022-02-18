import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BridgeButton, {
  BridgeButtonProps,
} from "../../common/components/BridgeButton/BridgeButton";

describe("The BridgeButton", () => {
  let mockCallback = jest.fn();
  let props: BridgeButtonProps;

  beforeEach(() => {
    props = {
      isConnected: true,
      inProgress: false,
      isNotEnoughBalance: false,
      isApproveReady: false,
      isDisabled: false,
      isEth: false,
      onWalletApprove: () => true,
      onWalletConnect: () => true,
      onMoveAssets: () => true,
    };
  });

  it("should show Connect wallet when wallet not connected", async () => {
    props.isConnected = false;
    render(<BridgeButton {...props} onWalletConnect={mockCallback} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("connect-wallet");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should show loading spinner and be disabled when inProgress", async () => {
    props.inProgress = true;
    render(<BridgeButton {...props} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("common.loading");
    expect(button).toHaveAttribute("disabled");
  });

  it("should be disabled and warn for not enough balance", async () => {
    props.isNotEnoughBalance = true;
    render(<BridgeButton {...props} />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveTextContent("insufficient-balance");
  });

  it("should ask to input amount and be disabled when none is set", async () => {
    props.isAmountSet = false;
    render(<BridgeButton {...props} />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveTextContent("input-amount");
  });

  it("should fallback to input amount text when none of the conditions met", async () => {
    props.isAmountSet = true;
    render(<BridgeButton {...props} />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveTextContent("input-amount");
  });

  it("should be able to bridge", async () => {
    props.isAbleToMove = true;
    props.isRouteIdSelected = true;
    props.isAmountSet = true;
    render(<BridgeButton {...props} onMoveAssets={mockCallback} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("bridge");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should be able to approve", async () => {
    props.isAmountSet = true;
    props.isApproveReady = true;
    props.isApproved = false;
    render(<BridgeButton {...props} onWalletApprove={mockCallback} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("common.approve");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
