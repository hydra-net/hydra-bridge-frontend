import { useEffect, useState } from "react";
import { buildApprovalTx } from "../../api/allowancesService";
import { buildBridgeTx, getQuote } from "../../api/bridgeService";
import {
  BuildTxRequestDto,
  ChainResponseDto,
  QuoteRequestDto,
  RouteDto,
  TokenBalanceDto,
  TokenResponseDto,
} from "../../common/dtos";
import { getBridgeTokens } from "../../api/commonService";
import { useWeb3 } from "@chainsafe/web3-context";
import { getUserAddressBalances } from "../../api/balancesService";
import { isEmpty } from "../../helpers/stringHelper";
import "dotenv/config";

const { REACT_APP_DEFAULT_NETWORK_ID, REACT_APP_ETH_CONTRACT } = process.env;

export default function useHome() {
  //transaction actions
  const [bridgeRoutes, setBridgeRoutes] = useState<RouteDto[]>([]);
  const [buildApproveTx, setBuildApproveTx] = useState<any>();
  const [bridgeTx, setBridgeTx] = useState<any>();
  const [txHash, setTxHash] = useState<string>();

  //errors
  const [error, setError] = useState<any>(undefined);

  //checks
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //state
  const [tokens, setTokens] = useState<TokenResponseDto[]>([]);
  const [chainFrom, setChainFrom] = useState<ChainResponseDto>();
  const [chainTo, setChainTo] = useState<ChainResponseDto>();
  const [walletBalances, setWalletBalances] = useState<TokenBalanceDto[]>();
  const [asset, setAsset] = useState<number>(4);
  const [amountIn, setAmountIn] = useState<number>(0.0);
  const [amountOut, setAmountOut] = useState<number>(0.0);
  const [routeId, setRouteId] = useState<number>(0);
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);

  //modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const token = tokens.find((t) => t.id === asset);
  const isEth = token?.symbol.toString().toLowerCase() === "eth";

  const { onboard, address, provider, network } = useWeb3();

  useEffect(() => {
    if (network && parseInt(REACT_APP_DEFAULT_NETWORK_ID!) === network) {
      setIsWrongNetwork(false);
    } else {
      setIsWrongNetwork(true);
    }
  }, [network, setIsWrongNetwork]);

  useEffect(() => {
    async function getWalletBalances() {
      try {
        if (address) {
          const res = await getUserAddressBalances(
            address,
            chainFrom
              ? chainFrom?.chainId!
              : parseInt(REACT_APP_DEFAULT_NETWORK_ID!)
          );
          if (res && res.success) {
            setWalletBalances(res.result);
          }
        }
      } catch (e) {
        console.log(e);
        setError(e);
        setIsErrorOpen(true);
      }
    }
    getWalletBalances();
  }, [address, chainFrom, setWalletBalances]);

  useEffect(() => {
    async function getTokens() {
      const res = await getBridgeTokens(
        chainFrom
          ? chainFrom?.chainId!
          : parseInt(REACT_APP_DEFAULT_NETWORK_ID!)
      );
      if (res && res.success) {
        setTokens(res.result);
      }
    }
    if (network) {
      getTokens();
    }
  }, [network, chainFrom]);

  const onConnectWallet = async () => {
    // Prompt user to select a wallet
    await onboard?.walletSelect();

    // Run wallet checks to make sure that user is ready to transact
    await onboard?.walletCheck();
  };

  const onGetQuote = async (dto: QuoteRequestDto) => {
    if (
      dto.amount &&
      dto.fromAsset &&
      dto.toAsset &&
      dto.toChainId &&
      dto.fromChainId &&
      dto.recipient &&
      !isWrongNetwork
    ) {
      setInProgress(true);
      try {
        const res = await getQuote(dto);
        if (res.success) {
          if (res.result) {
            const isEther = res.result.fromAsset.symbol.toLowerCase() === "eth";
            if (res.result.routes.length > 0) {
              let filteredRoutes = res.result.routes;

              if (isEther) {
                filteredRoutes = res.result.routes.filter(
                  (route: RouteDto) =>
                    route.bridgeRoute.bridgeName !== "hop-bridge-goerli"
                );
              }
              const cheapestRoute = filteredRoutes[0];
              setRouteId(cheapestRoute.id);
              setBridgeRoutes(filteredRoutes);
            }

            if (res.result.isApproved) {
              setIsApproved(true);
            } else {
              setIsApproved(false);

              if (!isEther) {
                await onBuildApproveTxData(
                  dto.recipient,
                  res.result.isApproved,
                  dto.toChainId,
                  dto.amount,
                  res.result.fromAsset.address
                );
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
        setError(e);
        setIsErrorOpen(true);
      } finally {
        setInProgress(false);
      }
    }
  };

  const onBuildApproveTxData = async (
    walletAddress: string,
    isApproved: boolean,
    chainId: number,
    amount: number,
    tokenAddress: string
  ) => {
    try {
      if (
        !isApproved &&
        walletAddress &&
        !isEmpty(amount.toString()) &&
        tokenAddress &&
        !isEth &&
        !isWrongNetwork
      ) {
        const res = await buildApprovalTx(
          chainId,
          walletAddress,
          REACT_APP_ETH_CONTRACT!,
          tokenAddress,
          amount
        );
        if (res.success) {
          console.log("Build approve data", res);
          setBuildApproveTx(res.result);
        }
      }
    } catch (e) {
      console.log(e);
      setError(e);
      setIsErrorOpen(true);
    }
  };

  const onApproveWallet = async () => {
    try {
      if (
        buildApproveTx &&
        !isWrongNetwork &&
        chainFrom?.isSendingEnabled &&
        chainTo?.isReceivingEnabled
      ) {
        const signer = provider!.getUncheckedSigner();
        const tx = await signer.sendTransaction(buildApproveTx);
        if (tx) {
          console.log("Approve tx hash:", tx.hash);
          setInProgress(true);
          setTxHash(tx.hash);
          setIsModalOpen(true);
          const receipt = await tx.wait();
          if (receipt.logs) {
            setIsApproved(true);
            console.log("Approve receipt logs", receipt.logs);
            await onGetQuote({
              recipient: address!,
              fromAsset: asset,
              fromChainId: chainFrom?.chainId!,
              toAsset: asset,
              toChainId: chainTo?.chainId!,
              amount: amountIn,
            });
          }
        }
      }
    } catch (e: any) {
      console.log(e);
      setError("Something went wrong!");
      setIsErrorOpen(true);
    } finally {
      setInProgress(false);
    }
  };

  const getBridgeTxData = async (dto: BuildTxRequestDto) => {
    if (!isWrongNetwork) {
      try {
        const res = await buildBridgeTx(dto);
        if (res.success) {
          console.log("bridge tx data res", res.result);
          setBridgeTx(res.result);
        }
      } catch (e) {
        console.log(e);
        setError(e);
        setIsErrorOpen(true);
      }
    }
  };

  const onReset = () => {
    setInProgress(false);
    setAmountOut(0.0);
    setAmountIn(0.0);
    setIsApproved(false);
    setRouteId(0);
  };

  return {
    onConnectWallet,
    onGetQuote,
    onBuildApproveTxData,
    onApproveWallet,
    onReset,
    getBridgeTxData,
    setChainFrom,
    setChainTo,
    setAsset,
    setAmountIn,
    setAmountOut,
    setRouteId,
    setInProgress,
    setIsModalOpen,
    setIsErrorOpen,
    setTxHash,
    setError,
    setIsApproved,
    walletBalances,
    isWrongNetwork,
    network,
    token,
    tokens,
    asset,
    amountIn,
    amountOut,
    routeId,
    isEth,
    isApproved,
    isErrorOpen,
    inProgress,
    isModalOpen,
    provider,
    chainFrom,
    chainTo,
    bridgeTx,
    buildApproveTx,
    txHash,
    bridgeRoutes,
    error,
  };
}
