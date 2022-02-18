import React from "react";

import styled from "styled-components";

import Icon from "../../common/components/Icon/Icon";
import BridgeButton from "../../common/components/BridgeButton/BridgeButton";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";

import { ETHEREUM, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto } from "../../common/dtos";
import { getVerticalGap } from "../../common/styles";
import { getOnlyNumbersAndAllowDotPattern } from "../../helpers/regexHelper";
import { Input } from "../../common/components/Atoms/Input/Input";

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
  amountIn: string;
  amountOut: string;
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
  onAmountChange: (evt: any) => void;
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
  const amountInAdditionalAttributes = {
    pattern: getOnlyNumbersAndAllowDotPattern,
    autocomplete: "off",
    autocorrect: "off",
    minLength: "1",
    maxLength: "79",
    spellCheck: false,
    inputMode: "decimal",
  };

  const handleAmountInChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = replaceUnwantedStringChars(evt.target.value);
    onAmountChange(value);
  };

  /**
   * Will replace unwanted chars from the value string (only 0-9 and .(dot) authorized)
   * @param value - the string to verify
   * @return the clean string
   */
  const replaceUnwantedStringChars = (value: string): string =>
    value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

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
          <Input
            value={!amountIn ? "" : amountIn}
            additionalAttributes={amountInAdditionalAttributes}
            placeholder={"0.0"}
            isDisabled={inProgress || isWrongNetwork}
            onChange={handleAmountInChange}
          />
          <Input
            value={!amountOut ? "" : amountOut}
            type={"text"}
            placeholder={"0.0"}
            isDisabled={true}
          />
        </AmountsContainer>
        <BridgeButton
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
