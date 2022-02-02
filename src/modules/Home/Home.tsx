import { useWeb3 } from "@chainsafe/web3-context";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AppMessage from "../../common/components/AppMessage";
import AssetSelect from "../../common/components/AssetSelect";
import BridgeRoutes from "../../common/components/BridgeRoutes/BridgeRoutes";
import HydraModal from "../../common/components/Modal/HydraModal";
import { BuildTxRequestDto, ChainResponseDto } from "../../common/dtos";
import { getFlexCenter } from "../../common/styles";
import useHome from "./useHome";
import _ from "lodash";
import MainContent from "./MainContent";
import { getIsNotEnoughBalance } from "../../helpers/walletHelper";
import useTokens from "../../common/hooks/useTokens";

const Root = styled.div``;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 520px;
  width: 100%;
  margin-top: 3rem;
  padding: 10px;
`;

const SendWrapper = styled.div`
  ${getFlexCenter}
  width: 100%;
  margin-bottom: 20px;
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
  const { tokens, isEth } = useTokens(chainFrom!, network!, asset);

  const isAbleToMove = isApproved || isEth;
  const isConnected = !!address;

  const [isNotEnoughBalance, setIsNotEnoughBalance] = useState<boolean>(false);

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
      setIsNotEnoughBalance(
        getIsNotEnoughBalance(walletBalances!, value, asset, isWrongNetwork)
      );
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
        console.log("Bridge funds error", e);
        setError("Something went wrong!");
        setIsErrorOpen(true);
      }
    }
  };

  const handleSelectAsset = (option: any) => {
    const { value } = option;
    setAsset(option ? value : null);
    if (amountIn && amountIn > 0) {
      getIsNotEnoughBalance(walletBalances!, amountIn, value, isWrongNetwork);
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

  const handleSelectChainFrom = (option: any) => {
    const { value } = option;
    if (value !== chainTo?.chainId) {
      setSelectedChain(value, true);
    }
  };

  const handleSelectChainTo = (option: any) => {
    const { value } = option;
    if (option && value !== chainTo?.chainId!) {
      setSelectedChain(value, false);
    }
  };

  const setSelectedChain = (chainId: number, isFromChain: boolean) => {
    const selectedChain = chains.find((chain) => chain.chainId === chainId);

    if (selectedChain) {
      isFromChain ? setChainFrom(selectedChain) : setChainTo(selectedChain);

      debouncedQuote(
        address!,
        asset,
        asset,
        isFromChain ? selectedChain.chainId : chainTo?.chainId!,
        isFromChain ? chainTo?.chainId! : selectedChain.chainId,
        amountIn!
      );
    } else {
      isFromChain ? setChainFrom(undefined) : setChainTo(undefined);
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
            onAmountChange={handleAmountInChange}
            onApproveWallet={onApproveWallet}
            onConnectWallet={onConnectWallet}
            onMoveAssets={handleMoveAssets}
            onSelectChainTo={handleSelectChainTo}
            onSelectChainFrom={handleSelectChainFrom}
          />

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
