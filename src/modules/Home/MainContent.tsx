import React from "react";
import { useTranslation } from "react-i18next";

import BridgeButton from "../../common/components/BridgeButton/BridgeButton";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { ContainerCard } from "../../common/components/Atoms/Containers/Container";
import { Input } from "../../common/components/Atoms/Input/Input";

import { ETH, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto } from "../../common/dtos";
import { getOnlyNumbersAndAllowDotPattern } from "../../helpers/regexHelper";
import { replaceCharsToHaveOnlyDotOrStringInIt } from "../../helpers/stringHelper";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

/**
 * Handler to map the results of the ChainResponseDto of the available sender to a SelectionOptionType
 * @param chains - the senders available
 */
const mapChainResponseDtoFromSendingTarget = (chains: ChainResponseDto[]) => {
  return chains
    .filter((item) => item.isSendingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes(GOERLI)
        ? ETH
        : (chain.name.toString().toLowerCase() as any);
      return {
        label: chain.name,
        value: chain.chainId,
        iconName: `${name}Coin`,
      };
    });
};

/**
 * Handler to map the results of the ChainResponseDto of the available receiver to a SelectionOptionType
 * @param chains - the receivers available
 */
const mapChainResponseDtoToReceivingTarget = (chains: ChainResponseDto[]) => {
  return chains
    .filter((item) => item.isReceivingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes(POLYGON)
        ? POLYGON
        : (chain.name.toString().toLowerCase() as any);

      return {
        label: chain.name,
        value: chain.chainId,
        iconName: `${name}Coin`,
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
  const { t } = useTranslation();

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
    const value = replaceCharsToHaveOnlyDotOrStringInIt(evt.target.value);
    onAmountChange(value);
  };

  return (
    <ContainerCard>
      <TransferChainSelects
        optionsChainsFrom={mapChainResponseDtoFromSendingTarget(chains)}
        optionsChainsTo={mapChainResponseDtoToReceivingTarget(chains)}
        chainFrom={chainFrom?.chainId!}
        chainTo={chainTo?.chainId!}
        onSelectChainFrom={onSelectChainFrom}
        onSelectChainTo={onSelectChainTo}
        isDisabled={inProgress || isWrongNetwork}
      />
      <Input
        label={t("common.send")}
        value={!amountIn ? "" : amountIn}
        additionalAttributes={amountInAdditionalAttributes}
        placeholder={"0.0"}
        isDisabled={inProgress || isWrongNetwork}
        onChange={handleAmountInChange}
        style={{ marginBottom: theme.margin.default }}
      />
      <Input
        label={t("common.receive")}
        value={!amountOut ? "" : amountOut}
        placeholder={"0.0"}
        isDisabled={true}
        style={{ marginBottom: theme.margin.default }}
      />
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
    </ContainerCard>
  );
};

export default MainContent;
