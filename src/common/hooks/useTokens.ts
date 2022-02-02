import { useEffect, useState } from "react";
import { getBridgeTokens } from "../../api/commonService";
import { ChainResponseDto, TokenResponseDto } from "../dtos";
import "dotenv/config";
import { ETH } from "../constants";

const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

function useTokens(
  chainFrom: ChainResponseDto,
  network: number,
  asset: number
) {
  const [tokens, setTokens] = useState<TokenResponseDto[]>([]);

  const token = tokens.find((t) => t.id === asset);
  const isEth = token?.symbol.toString().toLowerCase() === ETH;

  useEffect(() => {
    async function getTokens() {
      try {
        const res = await getBridgeTokens(
          chainFrom
            ? chainFrom?.chainId!
            : parseInt(REACT_APP_DEFAULT_NETWORK_ID!)
        );
        if (res && res.success) {
          setTokens(res.result);
        }
      } catch (e) {
        console.log("Get tokens error", e);
      }
    }
    if (network) {
      getTokens();
    }
  }, [network, chainFrom]);

  return {
    tokens,
    token,
    isEth,
  };
}

export default useTokens;
