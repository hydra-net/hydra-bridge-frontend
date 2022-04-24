import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import BridgeButton from "../../common/components/BridgeButton/BridgeButton";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { ContainerCard } from "../../common/components/Atoms/Containers/Container";
import { Input } from "../../common/components/Atoms/Input/Input";
import { InputLabel } from "../../common/components/Atoms/Label/Label";
import ReceiveDetailsAccordion, {
  ReceiveDetailsAccordionProps,
} from "../../common/components/Atoms/ReceiveDetails/ReceiveDetailsAccordion";

import { ETH, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto, RouteDto } from "../../common/dtos";
import { getOnlyNumbersAndAllowDotPattern } from "../../helpers/regexHelper";
import { replaceCharsToHaveOnlyDotOrStringInIt } from "../../helpers/stringHelper";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { getBridgeIcon } from "../../helpers/icons";
import { formatGasFees, formatServiceTime } from "../../helpers/formatsHelper";

/**
 * Inputs text attributes (send)
 */
const amountInAdditionalAttributes = {
  pattern: getOnlyNumbersAndAllowDotPattern,
  autocomplete: "off",
  autocorrect: "off",
  minLength: "1",
  maxLength: "79",
  spellCheck: false,
  inputMode: "decimal",
};

type Props = {
  chains: ChainResponseDto[];
  chainFrom: ChainResponseDto;
  chainTo: ChainResponseDto;
  amountIn: string;
  amountOut: string;
  route?: RouteDto;
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
  route,
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
  /**
   * Memo styles to avoid useless re-renders with inline styles
   */
  const memoStylesInputSend = useMemo(
    () => ({ marginBottom: theme.margin.default }),
    []
  );
  const memoStylesReceivesDetails = useMemo(
    () => ({ width: "100%", marginBottom: theme.margin.default }),
    []
  );

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

  /**
   * Format receive details data to be passed to the ReceiveDetailsAccordion
   */
  const getReceivesData = (): ReceiveDetailsAccordionProps | {} => {
    if (route) {
      try {
        const {
          bridgeRoute: {
            bridgeName,
            toAsset: { symbol },
            bridgeInfo: { serviceTime, displayName },
          },
          transactionCoastUsd,
        } = route;
        return {
          iconKey: getBridgeIcon(bridgeName),
          chainName: displayName,
          gasFees: formatGasFees(transactionCoastUsd),
          serviceTime: formatServiceTime(serviceTime),
          transactionFees: "0",
          amountOut,
          symbol,
        };
      } catch (err) {
        console.error("Couldn't extract route data", route);
      }
    }
    return {};
  };
  const handleAmountInChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = replaceCharsToHaveOnlyDotOrStringInIt(evt.target.value);
    onAmountChange(value);
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
        style={memoStylesInputSend}
      />
      <div style={memoStylesReceivesDetails}>
        <InputLabel>{t("common.receive")}</InputLabel>
        <ReceiveDetailsAccordion
          {...getReceivesData()}
          isLoading={inProgress}
        />
      </div>
      <BridgeButton
        isConnected={isConnected}
        isApproved={isApproved}
        inProgress={inProgress}
        isRouteIdSelected={route && route?.id > 0}
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
