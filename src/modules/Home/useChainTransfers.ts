import { useState } from "react";
import { ISelectOption } from "../../common/commonTypes";
import { ChainResponseDto } from "../../common/dtos";

function useChainTransfers(chains: ChainResponseDto[]) {
  const [chainFrom, setChainFrom] = useState<ChainResponseDto>();
  const [chainTo, setChainTo] = useState<ChainResponseDto>();

  const onSelectChainFrom = (
    option: ISelectOption
  ): ChainResponseDto | undefined => {
    const { value } = option;
    if (value !== chainFrom?.chainId) {
      const selectedChain = chains.find((chain) => chain.chainId === value);
      setChainFrom(selectedChain ?? undefined);
      return selectedChain;
    }
    return undefined;
  };

  const onSelectChainTo = (
    option: ISelectOption
  ): ChainResponseDto | undefined => {
    const { value } = option;
    if (value !== chainTo?.chainId) {
      const selectedChain = chains.find((chain) => chain.chainId === value);
      setChainTo(selectedChain ?? undefined);
      return selectedChain;
    }
    return undefined;
  };

  return {
    chainFrom,
    chainTo,
    onSelectChainFrom,
    onSelectChainTo,
  };
}

export default useChainTransfers;
