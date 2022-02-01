import styled, { useTheme } from "styled-components";
import { getFlexCenter } from "../../styles";
import Button from "../Buttons/Button";

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
  isWrongNetwork: boolean;
  onWalletConnect: () => void;
  onWalletApprove: () => void;
  onMoveAssets: () => void;
};

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
  isWrongNetwork,
  onWalletConnect,
  onWalletApprove,
  onMoveAssets,
}: Props) => {
  const theme = useTheme();
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
const isDisabled = inProgress || isWrongNetwork
  return (
    <Root>
      {!showApprove && !showInputAmount && !showMoveAssets && !isNotEnoughBalance && !showConnectButton && (
        <Button
          background={theme.buttonDefaultColor}
          fontWeight={"700"}
          width={"100%"}
          text="Loading..."
          isLoading={inProgress}
        />
      )}
      {isNotEnoughBalance && !showInputAmount && (
        <Button
          background={theme.buttonDefaultColor}
          fontWeight={"700"}
          width={"100%"}
          text={"Insufficient balance"}
          disabled={inProgress}
          isLoading={inProgress}
        />
      )}
      {showConnectButton && (
        <Button
          background={theme.blueColor}
          fontWeight={"700"}
          onClick={onWalletConnect}
          width={"100%"}
          text={"Connect wallet"}
          disabled={inProgress}
        />
      )}

      {showInputAmount && (
        <Button
          background={theme.buttonDefaultColor}
          fontWeight={"700"}
          width={"100%"}
          text={"Input amount"}
          disabled={inProgress}
          isLoading={inProgress}
        />
      )}

      {showMoveAssets && (
        <Button
          background={theme.blueColor}
          fontWeight={"700"}
          onClick={onMoveAssets}
          width={"100%"}
          text={"Bridge"}
          isLoading={inProgress}
          disabled={isDisabled}
        />
      )}

      {showApprove && (
        <Button
          background={theme.greenColor}
          fontWeight={"700"}
          onClick={onWalletApprove}
          width={"100%"}
          text={"Approve"}
          disabled={isDisabled}
          isLoading={inProgress}
        />
      )}
    </Root>
  );
};

export default ActionButtons;
