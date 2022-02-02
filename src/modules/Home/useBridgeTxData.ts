import { useEffect, useState } from "react";
import { buildBridgeTx } from "../../api/bridgeService";
import { BuildTxRequestDto, BuildTxResponseDto } from "../../common/dtos";

function useBridgeTxData(
  amount: number,
  fromAsset: number,
  toAsset: number,
  fromChainId: number,
  toChainId: number,
  routeId: number,
  recipient: string,
  isWrongNetwork: boolean,
  isApproved: boolean,
  isEth: boolean
) {
  const [bridgeTx, setBridgeTx] = useState<BuildTxResponseDto>();

  useEffect(() => {
    async function getMoveTxData() {
      await getBridgeTxData({
        amount,
        fromAsset,
        toAsset,
        fromChainId,
        toChainId,
        routeId,
        recipient,
      });
    }

    if (
      recipient &&
      amount &&
      (isApproved || (isEth && routeId > 0)) &&
      !isWrongNetwork
    ) {
      getMoveTxData();
    }
  }, [recipient, routeId, amount]); // eslint-disable-line react-hooks/exhaustive-deps

  const getBridgeTxData = async (dto: BuildTxRequestDto) => {
    if (!isWrongNetwork) {
      try {
        const response = await buildBridgeTx(dto);
        if (response) {
          setBridgeTx(response.result);
        }
      } catch (e) {
        console.log("Get bridge tx data error", e);
      }
    }
  };

  return {
    bridgeTx,
  };
}

export default useBridgeTxData;
