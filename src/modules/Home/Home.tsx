import { useWeb3 } from "@chainsafe/web3-context";
import styled from "styled-components";
import AssetSelect from "../../common/components/AssetSelect";
import BridgeRoutes from "../../common/components/BridgeRoutes/BridgeRoutes";
import HydraModal from "../../common/components/Modal/HydraModal";
import { ChainResponseDto } from "../../common/dtos";
import { getFlexCenter } from "../../common/styles";
import useHome from "./useHome";
import MainContent from "./MainContent";
import { getIsNotEnoughBalance } from "../../helpers/walletHelper";
import useTokens from "../../common/hooks/useTokens";
import useAmountInput from "./useAmountInput";
import useWalletBalances from "./useWalletBalances";
import useChainTransfers from "./useChainTransfers";
import { ISelectOption } from "../../common/commonTypes";
import { toast } from "react-toastify";

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

  const handleAmountInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowRoutes(false);
    setIsDisabled(true);
    const { value } = e.target;
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
        amount: amountIn!,
        fromAsset: asset!,
        toAsset: asset!,
        fromChainId: chainFrom!.chainId!,
        toChainId: chainTo!.chainId!,
        routeId: id,
        recipient: address!,
      });
    }
  };

  const handleSelectAsset = (option: ISelectOption) => {
    const { value } = option;
    setAsset(value);
    setShowRoutes(false);
    setIsDisabled(true);
    if (amountIn && amountIn > 0) {
      const isNotEnoughBalance = getIsNotEnoughBalance(
        walletBalances!,
        amountIn,
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
          amount: amountIn!,
        });
      }
      if (isNotEnoughBalance) {
        toast.error("Error not enough funds", { autoClose: false });
      }
      setIsNotEnoughBalance(isNotEnoughBalance);
    }
  };

  const hanldeOnSelectChainFrom = (option: ISelectOption) => {
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
        amount: amountIn!,
      });
    }
  };

  const hanldeOnSelectChainTo = (option: ISelectOption) => {
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
        amount: amountIn!,
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
    setAmountOut(0.0);
    setAmountIn(0.0);
    setIsApproved(false);
    setRouteId(0);
    setShowRoutes(false);
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
          <MainContent
            chains={chains}
            chainFrom={chainFrom!}
            chainTo={chainTo!}
            amountIn={amountIn!}
            amountOut={amountOut!}
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
                amountIn!,
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
        </Wrapper>
      </Root>

      <HydraModal
        network={network!}
        subtitle="Transaction"
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        tx={txHash!}
      />
    </>
  );
};

export default Home;
