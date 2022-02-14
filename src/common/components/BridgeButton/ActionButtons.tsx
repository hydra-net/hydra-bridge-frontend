import styled from "styled-components";

import { getFlexCenter } from "../../styles";
import { PrimaryButton } from "../Atoms/Buttons/Button";

const Root = styled.div`
  ${getFlexCenter};
  padding: 10px;
`;

type Props = {
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

// TODO REFACTOR https://trello.com/c/fKgax0oN/2-fe-improve-button-actions-to-show-consistent-loader-text-in-some-cases-loading-text-is-showed-in-some-cases-loader-is-showed
const ActionButtons = ({
  isEth,
  isAbleToMove,
  isRouteIdSelected,
  isAmountSet,
  isConnected,
  isApproved,
  inProgress,
  isNotEnoughBalance,
  isApproveReady,
  isDisabled,
  onWalletConnect,
  onWalletApprove,
  onMoveAssets,
}: Props) => {
  const showConnectButton = !isConnected && !inProgress;
  const showApprove =
    isConnected &&
    isAmountSet &&
    !isApproved &&
    !isEth &&
    !isNotEnoughBalance &&
    !inProgress &&
    isApproveReady;
  const showInputAmount = isConnected && !isAmountSet && !inProgress;
  const showMoveAssets =
    isConnected &&
    isAbleToMove &&
    isRouteIdSelected &&
    isAmountSet &&
    !isNotEnoughBalance &&
    !inProgress;

  return (
    <Root>
      {!showApprove &&
        !showInputAmount &&
        !showMoveAssets &&
        !isNotEnoughBalance &&
        !showConnectButton && (
          <PrimaryButton fullWidth={true} isLoading={inProgress}>
            Loading
          </PrimaryButton>
        )}
      {isNotEnoughBalance && !showInputAmount && (
        <PrimaryButton
          fullWidth={true}
          isDisabled={inProgress}
          isLoading={inProgress}
        >
          Insufficient balance
        </PrimaryButton>
      )}
      {showConnectButton && (
        <PrimaryButton
          fullWidth={true}
          isDisabled={inProgress}
          onClick={onWalletConnect}
        >
          Connect wallet
        </PrimaryButton>
      )}

      {showInputAmount && (
        <PrimaryButton
          fullWidth={true}
          isDisabled={inProgress}
          isLoading={inProgress}
        >
          Input amount
        </PrimaryButton>
      )}

      {showMoveAssets && (
        <PrimaryButton
          fullWidth={true}
          isDisabled={inProgress}
          isLoading={inProgress}
          onClick={onMoveAssets}
        >
          Bridge
        </PrimaryButton>
      )}

      {showApprove && (
        <PrimaryButton
          onClick={onWalletApprove}
          fullWidth={true}
          isDisabled={isDisabled}
          isLoading={inProgress}
        >
          Approve
        </PrimaryButton>
      )}
    </Root>
  );
};

export default ActionButtons;
