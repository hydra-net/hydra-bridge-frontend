import { useCallback, useEffect, useState } from "react";
import { buildApprovalTx } from "../../api/allowancesService";
import { buildBridgeTx, getQuote } from "../../api/bridgeService";
import {
  BuildAllowanceResponseDto,
  BuildTxRequestDto,
  BuildTxResponseDto,
  QuoteRequestDto,
  RouteDto,
} from "../../common/dtos";
import { useWeb3 } from "@chainsafe/web3-context";
import { isEmpty } from "../../helpers/stringHelper";
import { ETH, HOP_BRIDGE_GOERLI } from "../../common/constants";
import _ from "lodash";
import { toast } from "react-toastify";
import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

export default function useHome() {
  //transaction actions
  const [bridgeRoutes, setBridgeRoutes] = useState<RouteDto[]>([]);
  const [buildApproveTx, setBuildApproveTx] =
    useState<BuildAllowanceResponseDto>();
  const [bridgeTx, setBridgeTx] = useState<BuildTxResponseDto>();

  const [txHash, setTxHash] = useState<string>();

  //checks
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //state
  const [asset, setAsset] = useState<number>(4);
  const [routeId, setRouteId] = useState<number>(0);
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showRoutes, setShowRoutes] = useState<boolean>(false);

  //modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { onboard, address, provider, network } = useWeb3();

  const onConnectWallet = async () => {
    // Prompt user to select a wallet
    await onboard?.walletSelect();

    // Run wallet checks to make sure that user is ready to transact
    await onboard?.walletCheck();
  };

  useEffect(() => {
    if (network && parseInt(REACT_APP_DEFAULT_NETWORK_ID!) === network) {
      setIsWrongNetwork(false);
    } else {
      setIsWrongNetwork(true);
    }
  }, [network, setIsWrongNetwork]);

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
        const response = await getQuote(dto);
        if (response) {
          const { fromAsset, routes } = response.result;
          const isEther = fromAsset.symbol.toLowerCase() === ETH;
          if (routes.length > 0) {
            let filteredRoutes = routes;

            if (isEther) {
              filteredRoutes = routes.filter(
                (route: RouteDto) =>
                  route.bridgeRoute.bridgeName !== HOP_BRIDGE_GOERLI
              );
            }
            const cheapestRoute = filteredRoutes[0];
            setRouteId(cheapestRoute.id);
            setBridgeTx(cheapestRoute.buildTx);
            setBridgeRoutes(filteredRoutes);

            if (response.result.isApproved) {
              setIsApproved(true);
            } else {
              setIsApproved(false);

              if (!isEther) {
                await onBuildApproveTxData(
                  dto.recipient,
                  isApproved,
                  dto.toChainId,
                  dto.amount,
                  fromAsset.address,
                  isEther
                );
              }
            }
            setShowRoutes(true);
            setIsDisabled(false);
          }
        }
      } catch (e) {
        console.log("Get quote error", e);
      } finally {
        setInProgress(false);
      }
    }
  };

  const onQuote = async (dto: QuoteRequestDto) => {
    await onGetQuote(dto);
  };

  const onDebouncedQuote = useCallback(_.debounce(onQuote, 3000), []);

  const onBuildApproveTxData = async (
    walletAddress: string,
    isApproved: boolean,
    chainId: number,
    amount: number,
    tokenAddress: string,
    isEth: boolean
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
        const response = await buildApprovalTx(
          chainId,
          walletAddress,
          tokenAddress,
          amount
        );
        if (response) {
          setBuildApproveTx(response.result);
        }
      }
    } catch (e) {
      console.log("Build approve data error", e);
    }
  };

  const onApproveWallet = async (
    amountIn: number,
    isSendingEnabled: boolean,
    isReceivingEnabled: boolean,
    chainFromId: number,
    chainToId: number
  ) => {
    try {
      if (
        buildApproveTx &&
        !isWrongNetwork &&
        isSendingEnabled &&
        isReceivingEnabled
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
              fromChainId: chainFromId,
              toAsset: asset,
              toChainId: chainToId,
              amount: amountIn,
            });
          }
        }
      }
    } catch (e: any) {
      console.log("On approve wallet error", e);
      toast.error("Error approving wallet", { autoClose: false });
    } finally {
      setInProgress(false);
    }
  };

  const getBridgeTxData = async (dto: BuildTxRequestDto) => {
    if (!isWrongNetwork) {
      try {
        const response = await buildBridgeTx(dto);
        if (response) {
          setBridgeTx(response.result);
        }
      } catch (e) {
        console.log("Build bridge tx error", e);
      }
    }
  };

  const onMoveAssets = async (
    isEth: boolean,
    isSendingEnabled: boolean,
    isReceivingEnabled: boolean,
    bridgeTx: BuildTxResponseDto
  ) => {
    if (!isWrongNetwork && isSendingEnabled && isReceivingEnabled) {
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
          console.log("Move receipt logs", receipt.logs);
        }
      } catch (e: any) {
        console.log("Bridge funds error", e);
        toast.error("Error bridging funds", { autoClose: false });
      }
    }
  };

  const onRouteClick = async (dto: BuildTxRequestDto) => {
    if (!inProgress) {
      setRouteId(dto.routeId);
      await getBridgeTxData(dto);
    }
  };

  return {
    onDebouncedQuote,
    onMoveAssets,
    onConnectWallet,
    onGetQuote,
    onBuildApproveTxData,
    onApproveWallet,
    onRouteClick,
    setAsset,
    setRouteId,
    setInProgress,
    setIsModalOpen,
    setTxHash,
    setIsApproved,
    setShowRoutes,
    setIsDisabled,
    getBridgeTxData,
    showRoutes,
    isDisabled,
    isWrongNetwork,
    bridgeTx,
    network,
    asset,
    routeId,
    isApproved,
    inProgress,
    isModalOpen,
    provider,
    buildApproveTx,
    txHash,
    bridgeRoutes,
  };
}
