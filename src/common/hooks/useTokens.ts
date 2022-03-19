import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getBridgeTokens } from "../../api/commonService";
import { ChainResponseDto, TokenResponseDto } from "../dtos";
import { ETH } from "../constants";
import { handleError } from "../../helpers/error";

function useTokens(
  chainFrom: ChainResponseDto,
  network: number,
  asset: number
) {
  const [tokens, setTokens] = useState<TokenResponseDto[]>([]);
  const { t } = useTranslation();

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
      } catch (err) {
        handleError(t("error-getting-bridge-tokens"), err);
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
