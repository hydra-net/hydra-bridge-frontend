import styled from "styled-components";

import { getFlexCenter } from "../../styles";
import { ButtonProps, PrimaryButton } from "../Atoms/Buttons/Button";
import { IStyledButtonProps } from "../Atoms/Buttons/styles";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const attributes: ButtonProps & IStyledButtonProps = {
      fullWidth: true,
    };
    let displayText: string;
    let callback: () => void;
    callback = () => true;

    if (!isConnected) {
      displayText = t("connectWallet");
      callback = onWalletConnect;
    } else if (inProgress) {
      attributes.isLoading = true;
      attributes.isDisabled = true;
      displayText = t("common.loading");
    } else if (isNotEnoughBalance) {
      attributes.isDisabled = true;
      displayText = t("insufficientBalance");
    } else if (!isAmountSet) {
      attributes.isDisabled = true;
      displayText = t("inputAmount");
    } else if (isAbleToMove && isRouteIdSelected && isAmountSet) {
      displayText = t("bridge");
      callback = onMoveAssets;
    } else if (isAmountSet && !isApproved && isApproveReady && !isEth) {
      displayText = t("common.approve");
      callback = onWalletApprove;
    } else {
      attributes.isDisabled = true;
      displayText = t("inputAmount");
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
