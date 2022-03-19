import _ from "lodash";
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
import { ETH, HOP_BRIDGE_GOERLI } from "../../common/constants";
import { handleFetchError } from "../../helpers/error";

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

  //modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      } catch (err) {
        handleFetchError(t("errors.getting-quote"), err);
      } finally {
        setInProgress(false);
      }
    }
  };

  const onQuote = async (dto: QuoteRequestDto) => {
    await onGetQuote(dto);
  };

  const onDebouncedQuote = useCallback(_.debounce(onQuote, 0), []);

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
    } catch (err) {
      handleFetchError(t("errors.building-approval-transaction"), err);
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
          setIsModalOpen(true);
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
    } catch (err) {
      handleFetchError(t("errors.approving-wallet"), err);
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
      } catch (err) {
        handleFetchError(t("errors.building-bridge-tx"), err);
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
        setIsModalOpen(true);
        setShowRoutes(false);
        console.info("Move tx", tx);
        const receipt = await tx.wait();
        if (receipt.logs) {
          console.info("Move receipt logs", receipt.logs);
        }
      } catch (err) {
        handleFetchError(t("errors.bridging-funds"), err);
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
