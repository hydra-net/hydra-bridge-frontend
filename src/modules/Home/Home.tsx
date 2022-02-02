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
import useBridgeTxData from "./useBridgeTxData";

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
    setAsset,
    setRouteId,
    setIsModalOpen,
    setInProgress,
    setIsApproved,
    buildApproveTx,
    onDebouncedQuote,
    isWrongNetwork,
    routeId,
    asset,
    isApproved,
    inProgress,
    isModalOpen,
    bridgeRoutes,
    txHash,
  } = useHome();
  const { address, network } = useWeb3();
  const { chainFrom, chainTo, onSelectChainFrom, onSelectChainTo } =
    useChainTransfers(chains);
  const { walletBalances } = useWalletBalances(address!, chainFrom?.chainId!);
  const {
    amountIn,
    amountOut,
    isNotEnoughBalance,
    setAmountIn,
    setAmountOut,
    onAmountInChange,
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
  const { bridgeTx } = useBridgeTxData(
    amountIn,
    asset,
    asset,
    chainFrom?.chainId!,
    chainTo?.chainId!,
    routeId,
    address!,
    isWrongNetwork,
    isApproved,
    isEth
  );

  const isAbleToMove = isApproved || isEth;
  const isConnected = !!address;

  const handleSelectAsset = (option: ISelectOption) => {
    const { value } = option;
    setAsset(option ? value : null);
    if (amountIn && amountIn > 0) {
      getIsNotEnoughBalance(walletBalances!, amountIn, value, isWrongNetwork);
      onDebouncedQuote({
        recipient: address!,
        fromAsset: value,
        fromChainId: chainFrom?.chainId!,
        toAsset: value,
        toChainId: chainTo?.chainId!,
        amount: amountIn!,
      });
    }
  };

  const hanldeOnSelectChainFrom = (option: ISelectOption) => {
    const selectedChain = onSelectChainFrom(option);
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

  const hanldeOnSelectChainTo = (option: any) => {
    const selectedChain = onSelectChainTo(option);
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

  const handleOnRouteClick = (id: number) => {
    if (!inProgress) {
      setRouteId(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            onAmountChange={onAmountInChange}
            onApproveWallet={() =>
              onApproveWallet(
                amountIn,
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
