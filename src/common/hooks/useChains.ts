import { useEffect, useState } from "react";
import { getAllChains } from "../../api/commonService";
import { ChainResponseDto } from "../dtos";

function useChains() {
  const [chains, setChains] = useState<ChainResponseDto[]>([]);

  useEffect(() => {
    async function getChains() {
      try {
        const result = await getAllChains();
        if (result && result.length > 0) {
          setChains(result);
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
