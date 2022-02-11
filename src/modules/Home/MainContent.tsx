import styled from "styled-components";
import ActionButtons from "../../common/components/ActionButtons/ActionButtons";
import Icon from "../../common/components/Icon/Icon";
import AmountInput from "../../common/components/Input";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { ETHEREUM, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto } from "../../common/dtos";
import { getVerticalGap } from "../../common/styles";

const Root = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 1%) 0 0 1px, rgb(0 0 0 / 4%) 0 4px 8px,
    rgb(0 0 0 / 4%) 0 16px 24px, rgb(0 0 0 / 1%) 0 24px 32px;
  border-radius: 24px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  padding: 10px;
`;

const Container = styled.div`
  width: 100%;
`;

const AmountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${getVerticalGap("15px")};
`;

const getFromChains = (chains: ChainResponseDto[]) => {
  return chains
    .filter((item) => item.isSendingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes(GOERLI)
        ? ETHEREUM
        : (chain.name.toString().toLowerCase() as any);
      return {
        label: chain.name,
        value: chain.chainId,
        icon: <Icon name={name} size="20px" />,
      };
    });
};

const getToChains = (chains: ChainResponseDto[]) => {
  return chains
    .filter((item) => item.isReceivingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes(POLYGON)
        ? POLYGON
        : (chain.name.toString().toLowerCase() as any);

      return {
        label: chain.name,
        value: chain.chainId,
        icon: <Icon name={name} size="20px" />,
      };
    });
};

type Props = {
  chains: ChainResponseDto[];
  chainFrom: ChainResponseDto;
  chainTo: ChainResponseDto;
  amountIn: number;
  amountOut: number;
  routeId: number;
  isConnected: boolean;
  isApproved: boolean;
  inProgress: boolean;
  isWrongNetwork: boolean;
  isAbleToMove: boolean;
  isNotEnoughBalance: boolean;
  isApproveReady: boolean;
  isEth: boolean;
  isDisabled: boolean;
  onSelectChainFrom: (option: any) => void;
  onSelectChainTo: (option: any) => void;
  onAmountChange: (e: any) => void;
  onConnectWallet: () => void;
  onApproveWallet: () => void;
  onMoveAssets: () => void;
};

const MainContent = ({
  chains,
  chainFrom,
  chainTo,
  amountIn,
  amountOut,
  routeId,
  isEth,
  isAbleToMove,
  isNotEnoughBalance,
  isApproveReady,
  isApproved,
  isConnected,
  inProgress,
  isDisabled,
  isWrongNetwork,
  onSelectChainFrom,
  onSelectChainTo,
  onAmountChange,
  onConnectWallet,
  onApproveWallet,
  onMoveAssets,
}: Props) => {
  return (
    <Root>
      <Container>
        <TransferChainSelects
          chainsFrom={getFromChains(chains)}
          chainsTo={getToChains(chains)}
          chainFrom={chainFrom?.chainId!}
          chainTo={chainTo?.chainId!}
          onSelectChainFrom={onSelectChainFrom}
          onSelectChainTo={onSelectChainTo}
          isDisabled={inProgress || isWrongNetwork}
        />
        <AmountsContainer>
          <AmountInput
            amount={amountIn}
            label={"Send"}
            min={0}
            placeholder={"0.0"}
            disabled={inProgress || isWrongNetwork}
            onChange={onAmountChange}
          />
          <AmountInput
            amount={amountOut}
            placeholder={"0.0"}
            label={"Receive"}
            disabled={true}
          />
        </AmountsContainer>
        <ActionButtons
          isConnected={isConnected}
          isApproved={isApproved}
          inProgress={inProgress}
          isRouteIdSelected={routeId > 0}
          isEth={isEth}
          isAmountSet={!!amountIn}
          isAbleToMove={isAbleToMove}
          isNotEnoughBalance={isNotEnoughBalance}
          isApproveReady={isApproveReady}
          isDisabled={isDisabled}
          onWalletConnect={onConnectWallet}
          onWalletApprove={onApproveWallet}
          onMoveAssets={onMoveAssets}
        />
      </Container>
    </Root>
  );
};

export default MainContent;
