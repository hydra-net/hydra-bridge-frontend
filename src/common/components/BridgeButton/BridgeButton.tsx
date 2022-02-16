import styled from "styled-components";

import { getFlexCenter } from "../../styles";
import { ButtonProps, PrimaryButton } from "../Atoms/Buttons/Button";
import { IStyledButtonProps } from "../Atoms/Buttons/styles";

const Root = styled.div`
  ${getFlexCenter};
  padding: 10px;
`;

export type BridgeButtonProps = {
  isConnected?: boolean;
  isApproved?: boolean;
  isEth?: boolean;
  isAbleToMove?: boolean;
  isRouteIdSelected?: boolean;
  isAmountSet?: boolean;
  inProgress: boolean;
  isNotEnoughBalance: boolean;
  isApproveReady: boolean;
  isDisabled: boolean;
  onWalletConnect: () => void;
  onWalletApprove: () => void;
  onMoveAssets: () => void;
};

const BridgeButton = ({
  isEth,
  isAbleToMove,
  isRouteIdSelected,
  isAmountSet,
  isConnected,
  inProgress,
  isNotEnoughBalance,
  isApproveReady,
  isApproved,
  onWalletConnect,
  onWalletApprove,
  onMoveAssets,
}: BridgeButtonProps) => {
  const renderButton = () => {
    const attributes: ButtonProps & IStyledButtonProps = {
      fullWidth: true,
    };
    let displayText: string;
    let callback: () => void;
    callback = () => true;

    if (!isConnected) {
      displayText = "Connect wallet";
      callback = onWalletConnect;
    } else if (inProgress) {
      attributes.isLoading = true;
      attributes.isDisabled = true;
      displayText = "Loading";
    } else if (isNotEnoughBalance) {
      attributes.isDisabled = true;
      displayText = "Insufficient balance";
    } else if (!isAmountSet) {
      attributes.isDisabled = true;
      displayText = "Input amount";
    } else if (isAbleToMove && isRouteIdSelected && isAmountSet) {
      displayText = "Bridge";
      callback = onMoveAssets;
    } else if (isAmountSet && !isApproved && isApproveReady && !isEth) {
      displayText = "Approve";
      callback = onWalletApprove;
    } else {
      attributes.isDisabled = true;
      displayText = "Input amount";
    }
    return (
      <PrimaryButton {...attributes} onClick={callback}>
        {displayText}
      </PrimaryButton>
    );
  };

  return <Root>{renderButton()}</Root>;
};

export default BridgeButton;
