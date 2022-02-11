import { useEffect, useState } from "react";
import { getBridgeTokens } from "../../api/commonService";
import { ChainResponseDto, TokenResponseDto } from "../dtos";
import "dotenv/config";
import { ETH } from "../constants";

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
        const result = await getBridgeTokens(
          chainFrom ? chainFrom?.chainId! : network
        );

        if (result && result.length > 0) {
          setTokens(result);
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
