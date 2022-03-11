import { useTranslation } from "react-i18next";

import { ButtonProps, PrimaryButton } from "../Atoms/Buttons/Button";
import { IStyledButtonProps } from "../Atoms/Buttons/styles";
import { IStyleableProps } from "../../commonTypes";

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
  ...props
}: BridgeButtonProps & IStyleableProps) => {
  const renderButton = () => {
    const { t } = useTranslation();

    const attributes: ButtonProps & IStyledButtonProps = {
      fullWidth: true,
    };
    let displayText: string;
    let callback: () => void;
    callback = () => true;

    if (!isConnected) {
      displayText = t("connect-wallet");
      callback = onWalletConnect;
    } else if (inProgress) {
      attributes.isLoading = true;
      attributes.isDisabled = true;
      displayText = t("common.loading");
    } else if (isNotEnoughBalance) {
      attributes.isDisabled = true;
      displayText = t("insufficient-balance");
    } else if (!isAmountSet) {
      attributes.isDisabled = true;
      displayText = t("input-amount");
    } else if (isAbleToMove && isRouteIdSelected && isAmountSet) {
      displayText = t("bridge");
      callback = onMoveAssets;
    } else if (isAmountSet && !isApproved && isApproveReady && !isEth) {
      displayText = t("common.approve");
      callback = onWalletApprove;
    } else {
      attributes.isDisabled = true;
      displayText = t("input-amount");
    }
    return (
      <PrimaryButton onClick={callback} {...props} {...attributes}>
        {displayText}
      </PrimaryButton>
    );
  };

  return <>{renderButton()}</>;
};

export default BridgeButton;
