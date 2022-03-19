import _ from "lodash";
import { toast } from "react-toastify";
import { TransactionRequest } from "@ethersproject/abstract-provider";
import { useWeb3 } from "@chainsafe/web3-context";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { buildApprovalTx } from "../../api/allowancesService";
import { buildBridgeTx, getQuote } from "../../api/bridgeService";

import {
  BuildAllowanceResponseDto,
  BuildTxRequestDto,
  BuildTxResponseDto,
  QuoteRequestDto,
  RouteDto,
} from "../../common/dtos";
import {
  DEFAULT_NOTIFY_CONFIG,
  ETH,
  HOP_BRIDGE_GOERLI,
  NETWORK_EXPLORER_URLS,
} from "../../common/constants";
import { SupportedChainId } from "../../common/enums";
import { displayTxHash } from "../../shell/Shell";

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
  const [asset, setAsset] = useState<number>(0);
  const [routeId, setRouteId] = useState<number>(0);
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showRoutes, setShowRoutes] = useState<boolean>(false);

  const { onboard, address, provider, network } = useWeb3();
  const { t } = useTranslation();

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
        const result = await getQuote(dto);
        if (result) {
          const { fromAsset, routes } = result;
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

            if (result.isApproved) {
              setIsApproved(true);
            } else {
              setIsApproved(false);

              if (!isEther) {
                await onBuildApproveTxData(
                  dto.recipient,
                  isApproved,
                  dto.fromChainId,
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
        console.error("Get quote error", e);
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
    owner: string,
    isApproved: boolean,
    chainId: number,
    amount: number,
    tokenAddress: string,
    isEth: boolean
  ) => {
    try {
      if (
        !isApproved &&
        owner &&
        amount &&
        tokenAddress &&
        !isEth &&
        !isWrongNetwork
      ) {
        const response = await buildApprovalTx({
          chainId,
          owner,
          tokenAddress,
          amount,
        });
        if (response) {
          setBuildApproveTx(response);
        }
      }
    } catch (e) {
      console.error("Build approve data error", e);
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
          console.info("Approve tx hash:", tx.hash);
          setInProgress(true);
          setTxHash(tx.hash);
          notifyTxHash(tx.hash, network!);
          const receipt = await tx.wait();
          if (receipt.logs) {
            setIsApproved(true);
            console.info("Approve receipt logs", receipt.logs);
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
      console.error("On approve wallet error", e);
      toast.error(t("notification.error-approving-wallet"), {
        autoClose: false,
      });
    } finally {
      setInProgress(false);
    }
  };

  const getBridgeTxData = async (dto: BuildTxRequestDto) => {
    if (!isWrongNetwork) {
      try {
        const response = await buildBridgeTx(dto);
        if (response) {
          setBridgeTx(response);
        }
      } catch (e) {
        console.error("Build bridge tx error", e);
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
        console.info("bridge tx move:", bridgeTx);
        let dto: TransactionRequest = { data, to, from };
        if (isEth) {
          dto.value = value;
        }

        const tx = await signer.sendTransaction(dto);
        setInProgress(true);
        setTxHash(tx.hash);
        notifyTxHash(tx.hash, network!);
        setShowRoutes(false);
        console.info("Move tx", tx);
        const receipt = await tx.wait();
        if (receipt.logs) {
          console.info("Move receipt logs", receipt.logs);
        }
      } catch (e: any) {
        console.error("Bridge funds error", e);
        toast.error(t("notification.error-bridging-funds"), {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: false,
        });
      }
    }
  };

  const onRouteClick = async (dto: BuildTxRequestDto) => {
    if (!inProgress) {
      setRouteId(dto.routeId);
      await getBridgeTxData(dto);
    }
  };

  const notifyTxHash = (txHash: string, network: number) => {
    const txUrl = `${
      NETWORK_EXPLORER_URLS[
        network === SupportedChainId.GOERLI
          ? SupportedChainId.MAINNET
          : SupportedChainId.MAINNET
      ]
    }/tx/${txHash}`;

    displayTxHash(txHash, txUrl);
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
    provider,
    buildApproveTx,
    txHash,
    bridgeRoutes,
  };
}
