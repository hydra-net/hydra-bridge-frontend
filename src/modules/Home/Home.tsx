import React from "react";
import { useWeb3 } from "@chainsafe/web3-context";
import { toast } from "react-toastify";
import styled from "styled-components";

import useHome from "./useHome";
import useTokens from "../../common/hooks/useTokens";
import useWalletBalances from "./useWalletBalances";
import useChainTransfers from "./useChainTransfers";
import useAmountInput from "./useAmountInput";

import MainContent from "./MainContent";
import AssetSelect from "../../common/components/AssetSelect";
import BridgeRoutes from "../../common/components/BridgeRoutes/BridgeRoutes";
import HydraModal from "../../common/components/Modal/HydraModal";
import {
  Container,
  ContainerCard,
} from "../../common/components/Atoms/Containers/Container";
import Icon from "../../common/components/Icon/Icon";
import { FlexWrapper } from "../../common/components/Atoms/Wrappers/Wrapper";
import ConnectWallet from "../../common/components/ConnectWallet/ConnectWallet";

import { ChainResponseDto } from "../../common/dtos";
import { SelectOptionType } from "../../common/components/Molecules/BrandSelect/SelectOption";
import { ContainerType } from "../../common/enums";
import { getIsNotEnoughBalance } from "../../helpers/walletHelper";

import { devicesUp } from "../../media";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

const StyledHydraBackground = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  background: url("./hydra-background.svg") no-repeat fixed center center;
  background-size: cover;
`;

const CustomFlexWrapper = styled(FlexWrapper)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.margin.xl};

  .hydra-bridge-logo-sm {
    width: 40%;
  }

  @media only screen and ${devicesUp.sm} {
    justify-content: flex-end;
    .hydra-bridge-logo-sm {
      display: none;
    }
  }
`;

const ResponsiveFlexWrapper = styled(FlexWrapper)`
  .hydra-bridge-logo {
    display: none;
  }
  .asset-select {
    width: 100%;
  }

  @media only screen and ${devicesUp.sm} {
    .hydra-bridge-logo {
      display: block;
      margin-bottom: ${theme.margin.xl};
    }
  }

  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: space-between;

    .hydra-bridge-logo {
      width: 28%;
      margin-bottom: 0;
    }
    .asset-select {
      max-width: ${theme.maxWidth.lg};
    }
  }
`;

type Props = {
  chains: ChainResponseDto[];
};

const Home = ({ chains }: Props) => {
  const {
    onConnectWallet,
    onApproveWallet,
    onMoveAssets,
    onRouteClick,
    setAsset,
    setRouteId,
    setIsModalOpen,
    setInProgress,
    setIsApproved,
    setShowRoutes,
    setIsDisabled,
    showRoutes,
    bridgeTx,
    isWrongNetwork,
    buildApproveTx,
    onDebouncedQuote,
    routeId,
    asset,
    isDisabled,
    isApproved,
    inProgress,
    isModalOpen,
    bridgeRoutes,
    txHash,
  } = useHome();
  const { address, network } = useWeb3();
  const { chainFrom, chainTo, onSelectChainFrom, onSelectChainTo } =
    useChainTransfers(chains);
  const { walletBalances } = useWalletBalances(address!, network!);
  const {
    amountIn,
    amountOut,
    isNotEnoughBalance,
    setAmountIn,
    setAmountOut,
    onAmountInChange,
    getParsedAmountIn,
    setIsNotEnoughBalance,
  } = useAmountInput(
    address!,
    asset,
    chainFrom?.chainId!,
    asset,
    chainTo?.chainId!,
    walletBalances,
    isWrongNetwork,
    onDebouncedQuote
  );
  const { tokens, isEth } = useTokens(chainFrom!, network!, asset);

  const isAbleToMove = isApproved || isEth;
  const isConnected = !!address;
  const isActionDisabled = inProgress || isWrongNetwork || isDisabled;

  const handleAmountInChange = (value: string) => {
    setShowRoutes(false);
    setIsDisabled(true);
    onAmountInChange(value);
  };

  const handleOnRouteClick = async (id: number) => {
    if (
      address &&
      amountIn &&
      (isApproved || (isEth && id > 0)) &&
      !isWrongNetwork
    ) {
      await onRouteClick({
        amount: getParsedAmountIn(),
        fromAsset: asset!,
        toAsset: asset!,
        fromChainId: chainFrom!.chainId!,
        toChainId: chainTo!.chainId!,
        routeId: id,
        recipient: address!,
      });
    }
  };

  const handleSelectAsset = (option: SelectOptionType) => {
    const { value } = option;
    setAsset(value);
    setShowRoutes(false);
    setIsDisabled(true);
    if (amountIn && getParsedAmountIn() > 0) {
      const isNotEnoughBalance = getIsNotEnoughBalance(
        walletBalances!,
        getParsedAmountIn(),
        value,
        isWrongNetwork
      );
      if (!isNotEnoughBalance) {
        onDebouncedQuote({
          recipient: address!,
          fromAsset: value,
          fromChainId: chainFrom?.chainId!,
          toAsset: value,
          toChainId: chainTo?.chainId!,
          amount: getParsedAmountIn(),
        });
      }
      if (isNotEnoughBalance) {
        toast.error("Error not enough funds", { autoClose: false });
      }
      setIsNotEnoughBalance(isNotEnoughBalance);
    }
  };

  const hanldeOnSelectChainFrom = (option: SelectOptionType) => {
    const selectedChain = onSelectChainFrom(option);
    setShowRoutes(false);
    setIsDisabled(true);
    if (selectedChain) {
      onDebouncedQuote({
        recipient: address!,
        fromAsset: asset,
        fromChainId: selectedChain.chainId,
        toAsset: asset,
        toChainId: chainTo?.chainId!,
        amount: getParsedAmountIn(),
      });
    }
  };

  const hanldeOnSelectChainTo = (option: SelectOptionType) => {
    const selectedChain = onSelectChainTo(option);
    setShowRoutes(false);
    setIsDisabled(true);
    if (selectedChain) {
      onDebouncedQuote({
        recipient: address!,
        fromAsset: asset,
        fromChainId: chainFrom?.chainId!,
        toAsset: asset,
        toChainId: selectedChain.chainId,
        amount: getParsedAmountIn(),
      });
    }
  };

  const handleMoveAssets = async () => {
    await onMoveAssets(
      isEth,
      chainFrom?.isSendingEnabled!,
      chainTo?.isReceivingEnabled!,
      bridgeTx!
    );
    onResetValues();
  };

  const onResetValues = () => {
    setInProgress(false);
    setAmountOut("");
    setAmountIn("");
    setIsApproved(false);
    setRouteId(0);
    setShowRoutes(false);
  };

  return (
    <StyledHydraBackground>
      <Container
        type={ContainerType.XXXL}
        style={{
          paddingTop: theme.margin.xxl,
          paddingBottom: theme.margin.xxl,
        }}
      >
        <Container type={ContainerType.XL}>
          <CustomFlexWrapper>
            <Icon
              className={"hydra-bridge-logo-sm"}
              width={"20rem"}
              height={"7rem"}
              name={"hydraBridgeLogoSm"}
            />
            <ConnectWallet />
          </CustomFlexWrapper>
        </Container>
        <Container maxWidth={theme.maxWidth["6xl"]} noGutter={true}>
          <ContainerCard style={{ marginBottom: theme.margin.xxl }}>
            <ResponsiveFlexWrapper>
              <Icon
                className={"hydra-bridge-logo"}
                width={"20rem"}
                height={"7rem"}
                name={"hydraBridgeLogo"}
              />
              <AssetSelect
                className={"asset-select"}
                isLoading={inProgress}
                isDisabled={isWrongNetwork}
                selectedTokenId={asset}
                tokens={tokens}
                onSelectAsset={handleSelectAsset}
              />
            </ResponsiveFlexWrapper>
          </ContainerCard>
          <MainContent
            chains={chains}
            chainFrom={chainFrom!}
            chainTo={chainTo!}
            amountIn={amountIn}
            amountOut={amountOut}
            routeId={routeId}
            inProgress={inProgress}
            isAbleToMove={isAbleToMove}
            isApproveReady={!!buildApproveTx}
            isApproved={isApproved}
            isConnected={isConnected}
            isEth={isEth}
            isNotEnoughBalance={isNotEnoughBalance}
            isWrongNetwork={isWrongNetwork}
            isDisabled={isActionDisabled}
            onAmountChange={handleAmountInChange}
            onApproveWallet={() =>
              onApproveWallet(
                getParsedAmountIn(),
                chainFrom?.isSendingEnabled!,
                chainTo?.isReceivingEnabled!,
                chainFrom?.chainId!,
                chainTo?.chainId!
              )
            }
            onConnectWallet={onConnectWallet}
            onMoveAssets={handleMoveAssets}
            onSelectChainTo={hanldeOnSelectChainTo}
            onSelectChainFrom={hanldeOnSelectChainFrom}
          />

          {showRoutes && !isNotEnoughBalance && isAbleToMove && (
            <BridgeRoutes
              inProgress={inProgress}
              selectedRouteId={routeId}
              routes={bridgeRoutes}
              onRouteSelect={handleOnRouteClick}
            />
          )}
          <HydraModal
            network={network!}
            subtitle="Transaction"
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            tx={txHash!}
          />
        </Container>
      </Container>
    </StyledHydraBackground>
  );
};

export default Home;
