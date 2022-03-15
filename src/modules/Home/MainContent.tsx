import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BridgeButton from "../../common/components/BridgeButton/BridgeButton";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { ContainerCard } from "../../common/components/Atoms/Containers/Container";
import { Input } from "../../common/components/Atoms/Input/Input";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";
import { ReceiveDetailsAccordionHeader } from "../../common/components/Molecules/Accordion/AccordionHeaders";
import ReceiveDetails from "../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import Accordion from "../../common/components/Molecules/Accordion/Accordion";
import { AccordionContent } from "../../common/components/Molecules/Accordion/styles";

import { ETH, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto, RouteDto } from "../../common/dtos";
import { getOnlyNumbersAndAllowDotPattern } from "../../helpers/regexHelper";
import { replaceCharsToHaveOnlyDotOrStringInIt } from "../../helpers/stringHelper";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { IconKeys } from "../../common/commonTypes";

type Props = {
  chains: ChainResponseDto[];
  chainFrom: ChainResponseDto;
  chainTo: ChainResponseDto;
  amountIn: string;
  amountOut: string;
  selectedRoute?: RouteDto;
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
  selectedRoute,
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
  const [isReceiveDetailsOpen, setIsReceiveDetailsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setIsReceiveDetailsOpen(!!selectedRoute);
  }, [selectedRoute]);

  const amountInAdditionalAttributes = {
    pattern: getOnlyNumbersAndAllowDotPattern,
    autocomplete: "off",
    autocorrect: "off",
    minLength: "1",
    maxLength: "79",
    spellCheck: false,
    inputMode: "decimal",
  };

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

  const handleAmountInChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = replaceCharsToHaveOnlyDotOrStringInIt(evt.target.value);
    onAmountChange(value);
  };

  const renderReceiveDetailsContent = (): ReactNode => {
    const props = {
      iconKey: "hopBridge" as IconKeys,
      chainName: "Hop",
      gasFees: 0.39979797399225586,
      serviceTime: 800,
      transactionFees: "0.00001 ETH",
      slippage: "0.00001 ETH",
      amountOut: "0.00001 ETH",
    };
    return (
      <AccordionContent padding={"0 1.6rem 1.6rem 1.6rem"}>
        <ReceiveDetails {...props} />
      </AccordionContent>
    );
  };

  return (
    <ContainerCard hasHoverEffect={true}>
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

      <Label style={{ marginRight: "auto" }}>{t("common.receive")}</Label>
      <Accordion
        header={
          <ReceiveDetailsAccordionHeader
            isOpen={isReceiveDetailsOpen}
            amountOut={amountOut}
            inProgress={inProgress}
            transactionCoastUsd={selectedRoute?.transactionCoastUsd}
          />
        }
        content={renderReceiveDetailsContent()}
        isOpenFromParent={isReceiveDetailsOpen}
        onToggle={() => setIsReceiveDetailsOpen(!isReceiveDetailsOpen)}
      />

      <BridgeButton
        isConnected={isConnected}
        isApproved={isApproved}
        inProgress={inProgress}
        isRouteIdSelected={!!selectedRoute?.id}
        isEth={isEth}
        isAmountSet={!!amountIn}
        isAbleToMove={isAbleToMove}
        isNotEnoughBalance={isNotEnoughBalance}
        isApproveReady={isApproveReady}
        isDisabled={isDisabled}
        onWalletConnect={onConnectWallet}
        onWalletApprove={onApproveWallet}
        onMoveAssets={onMoveAssets}
        style={{
          marginBottom: theme.margin.sm,
          marginTop: theme.margin.default,
        }}
      />
    </ContainerCard>
  );
};

export default MainContent;
