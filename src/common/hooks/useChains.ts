import { useEffect, useState } from "react";
import { getAllChains } from "../../api/commonService";
import { ChainResponseDto } from "../dtos";
import { SupportedChainId } from "../enums";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

function useChains() {
  const [chains, setChains] = useState<ChainResponseDto[]>([]);

  useEffect(() => {
    async function getChains() {
      try {
        const result = await getAllChains();

        if (result && result.length > 0) {
          const isTestnet =
            parseInt(REACT_APP_DEFAULT_NETWORK_ID!) === SupportedChainId.GOERLI;
          let filtered: ChainResponseDto[];
          filtered = result.filter((chain) => chain.isTestnet === isTestnet);
          setChains(filtered);
        }
      } catch (e) {
        console.log("Get chains failed:", e);
      }
    }
    getChains();
  }, []);

  return {
    chains,
    setChains,
  };
}

export default useChains;
