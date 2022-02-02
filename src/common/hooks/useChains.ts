import { useEffect, useState } from "react";
import { getAllChains } from "../../api/commonService";
import { ChainResponseDto } from "../dtos";

function useChains() {
  const [chains, setChains] = useState<ChainResponseDto[]>([]);

  useEffect(() => {
    async function getChains() {
      try {
        const res = await getAllChains();
        if (res && res.success) {
          setChains(res.result);
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
