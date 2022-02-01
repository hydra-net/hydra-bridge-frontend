import { useWeb3 } from "@chainsafe/web3-context";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ActionButtons from "../../common/components/ActionButtons/ActionButtons";
import AppMessage from "../../common/components/AppMessage";
import AssetSelect from "../../common/components/AssetSelect";
import BridgeRoutes from "../../common/components/BridgeRoutes/BridgeRoutes";
import Icon from "../../common/components/Icon/Icon";
import AmountInput from "../../common/components/Input";
import HydraModal from "../../common/components/Modal/HydraModal";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { BuildTxRequestDto, ChainResponseDto } from "../../common/dtos";
import { getFlexCenter, getVerticalGap } from "../../common/styles";
import useHome from "./useHome";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "ethers";
import _ from "lodash";

const Root = styled.div``;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 520px;
  width: 100%;
  margin-top: 3rem;
  padding: 10px;
`;

const TransferWrapper = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 24px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  padding: 10px;
`;
const SendWrapper = styled.div`
  ${getFlexCenter}
  width: 100%;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
`;

const AmountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${getVerticalGap("15px")};
`;

const ErrorContainer = styled.div`
  margin-bottom: 10px;
`;

type Props = {
  chains: ChainResponseDto[];
};

const Home = ({ chains }: Props) => {
  const {
    onConnectWallet,
    onApproveWallet,
    onReset,
    getBridgeTxData,
    onGetQuote,
    setChainFrom,
    setChainTo,
    setAsset,
    setAmountIn,
    setAmountOut,
    setRouteId,
    setIsErrorOpen,
    setInProgress,
    setTxHash,
    setIsModalOpen,
    setError,
    isWrongNetwork,
    buildApproveTx,
    walletBalances,
    tokens,
    isEth,
    amountIn,
    amountOut,
    routeId,
    asset,
    isErrorOpen,
    isApproved,
    inProgress,
    isModalOpen,
    bridgeTx,
    provider,
    bridgeRoutes,
    chainTo,
    chainFrom,
    txHash,
    error,
  } = useHome();
  const { address, network } = useWeb3();
  const isAbleToMove = isApproved || isEth;
  const isConnected = !!address;

  const [isNotEnoughBalance, setIsNotEnoughBalance] = useState<boolean>(false);

  const chainsFrom = chains
    .filter((item) => item.isSendingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes("goerli")
        ? "ethereum"
        : (chain.name.toString().toLowerCase() as any);
      return {
        label: chain.name,
        value: chain.chainId,
        icon: <Icon name={name} size="20px" />,
      };
    });

  const chainsTo = chains
    .filter((item) => item.isReceivingEnabled)
    .map((chain: ChainResponseDto) => {
      const name = chain.name.toString().toLowerCase().includes("polygon")
        ? "polygon"
        : (chain.name.toString().toLowerCase() as any);

      return {
        label: chain.name,
        value: chain.chainId,
        icon: <Icon name={name} size="20px" />,
      };
    });

  const handleQuote = async (
    recipient: string,
    fromAsset: number,
    toAsset: number,
    fromChainId: number,
    toChainId: number,
    amount: number
  ) => {
    await onGetQuote({
      recipient: recipient,
      fromAsset: fromAsset,
      fromChainId: fromChainId,
      toAsset: toAsset,
      toChainId: toChainId,
      amount: amount,
    });
  };

  const debouncedQuote = useCallback(_.debounce(handleQuote, 3000), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getMoveTxData() {
      const dto: BuildTxRequestDto = {
        amount: amountIn!,
        fromAsset: asset!,
        toAsset: asset!,
        fromChainId: chainFrom!.chainId!,
        toChainId: chainTo!.chainId!,
        routeId: routeId!,
        recipient: address!,
      };

      await getBridgeTxData(dto);
    }

    if (
      address &&
      amountIn &&
      (isApproved || (isEth && routeId > 0)) &&
      !isWrongNetwork
    ) {
      getMoveTxData();
    }
  }, [isApproved, routeId, amountIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAmountInChange = (e: any) => {
    const { value } = e.target;
    let regEx = new RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/); //eslint-disable-line no-useless-escape
    if (regEx.test(value)) {
      setAmountIn(value);
      setAmountOut(value);
      checkBalance(value, asset);
      debouncedQuote(
        address!,
        asset,
        asset,
        chainFrom?.chainId!,
        chainTo?.chainId!,
        value
      );
    } else {
      const parsedValue = value.replace(/\D/, "");
      setAmountIn(parsedValue);
      setAmountOut(parsedValue);
    }
  };

  const checkBalance = (value: number, asset: number) => {
    try {
      const tokenBalanceDto = walletBalances?.find(
        (tokenBalance) => tokenBalance.tokenId === asset
      );
      if (tokenBalanceDto && value && !isWrongNetwork) {
        const units =
          tokenBalanceDto.symbol.toLocaleLowerCase() !== "eth" ? 6 : 18;
        const parsedAmountToSpend = parseUnits(value.toString(), units);
        const amountInBig = ethers.BigNumber.from(parsedAmountToSpend);
        const balanceBig = ethers.BigNumber.from(tokenBalanceDto?.amount!);
        setIsNotEnoughBalance(amountInBig.gt(balanceBig));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMoveAssets = async () => {
    if (
      !isWrongNetwork &&
      chainFrom?.isSendingEnabled &&
      chainTo?.isReceivingEnabled
    ) {
      try {
        const signer = provider!.getUncheckedSigner();
        const { data, to, from, value } = bridgeTx;
        console.log("bridge tx move:", bridgeTx);
        let dto: any = { data, to, from };
        if (isEth) {
          dto.value = value;
        }

        const tx = await signer.sendTransaction(dto);
        setInProgress(true);
        setTxHash(tx.hash);
        setIsModalOpen(true);
        console.log("Move tx", tx);
        const receipt = await tx.wait();
        if (receipt.logs) {
          onReset();
          console.log("Move receipt logs", receipt.logs);
        }
      } catch (e: any) {
        console.log(e);
        setError("Something went wrong!");
        setIsErrorOpen(true);
      }
    }
  };

  const handleSelectChainFrom = (option: any) => {
    const { value } = option;
    if (value !== chainTo?.chainId) {
      const selectedChain = chains.find((chain) => chain.chainId === value);
      if (selectedChain) {
        setChainFrom(selectedChain);
        debouncedQuote(
          address!,
          asset,
          asset,
          selectedChain.chainId,
          chainTo?.chainId!,
          amountIn!
        );
      } else {
        setChainFrom(undefined);
      }
    }
  };

  const handleSelectChainTo = (option: any) => {
    const { value } = option;
    if (option && value !== chainTo?.chainId!) {
      const selectedChain = chains.find((chain) => chain.chainId === value);
      if (selectedChain) {
        setChainTo(selectedChain);
        debouncedQuote(
          address!,
          asset,
          asset,
          chainFrom?.chainId!,
          selectedChain.chainId,
          amountIn!
        );
      } else {
        setChainTo(undefined);
      }
    }
  };

  const handleSelectAsset = (option: any) => {
    const { value } = option;
    setAsset(option ? value : null);
    if (amountIn && amountIn > 0) {
      checkBalance(amountIn, value);
      debouncedQuote(
        address!,
        value,
        value,
        chainFrom?.chainId!,
        chainTo?.chainId!,
        amountIn!
      );
    }
  };

  const handleOnRouteClick = (id: number) => {
    if (!inProgress) {
      setRouteId(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Root>
        <Wrapper>
          <SendWrapper>
            <AssetSelect
              isLoading={inProgress}
              isDisabled={isWrongNetwork}
              selectedTokenId={asset}
              tokens={tokens}
              onSelectAsset={handleSelectAsset}
            />
          </SendWrapper>
          {error && (
            <ErrorContainer>
              <AppMessage
                isOpen={isErrorOpen}
                message={error}
                onClose={() => setIsErrorOpen(false)}
              />
            </ErrorContainer>
          )}
          <TransferWrapper>
            <Container>
              <TransferChainSelects
                chainsFrom={chainsFrom}
                chainsTo={chainsTo}
                chainFrom={chainFrom?.chainId!}
                chainTo={chainTo?.chainId!}
                onSelectChainFrom={handleSelectChainFrom}
                onSelectChainTo={handleSelectChainTo}
                isDisabled={inProgress || isWrongNetwork}
              />
              <AmountsContainer>
                <AmountInput
                  amount={amountIn}
                  label={"Send"}
                  min={0}
                  placeholder={"0.0"}
                  disabled={inProgress || isWrongNetwork}
                  onChange={handleAmountInChange}
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
                isApproveReady={!!buildApproveTx}
                isWrongNetwork={isWrongNetwork}
                onWalletConnect={onConnectWallet}
                onWalletApprove={onApproveWallet}
                onMoveAssets={handleMoveAssets}
              />
            </Container>
          </TransferWrapper>
          {isAbleToMove &&
            !!amountIn &&
            amountIn > 0 &&
            isConnected &&
            !isNotEnoughBalance &&
            !isWrongNetwork && (
              <BridgeRoutes
                inProgress={inProgress}
                selectedRouteId={routeId}
                routes={bridgeRoutes}
                onRouteSelect={handleOnRouteClick}
              />
            )}
        </Wrapper>
      </Root>

      <HydraModal
        network={network!}
        subtitle="Transaction"
        onClose={handleCloseModal}
        isOpen={isModalOpen}
        tx={txHash!}
      />
    </>
  );
};

export default Home;
