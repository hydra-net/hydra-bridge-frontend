import { useState } from "react";
import { getIsNotEnoughBalance } from "../../helpers/walletHelper";
import _ from "lodash";
import { QuoteRequestDto, TokenBalanceDto } from "../../common/dtos";
import { parseStringToNumber } from "../../helpers/numberHelper";

function useAmountInput(
  recipient: string,
  fromAsset: number,
  fromChainId: number,
  toAsset: number,
  toChainId: number,
  walletBalances: TokenBalanceDto[],
  isWrongNetwork: boolean,
  onDebouncedQuote: _.DebouncedFunc<(dto: QuoteRequestDto) => Promise<void>>
) {
  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOut, setAmountOut] = useState<string>("");
  const [isNotEnoughBalance, setIsNotEnoughBalance] = useState<boolean>(false);

  const getParsedAmountIn = (): number => parseStringToNumber(amountIn);
  const getParsedAmountOut = (): number => parseStringToNumber(amountOut);

  const onAmountInChange = (value: string) => {
    setAmountIn(value);
    setAmountOut(value);
    setIsNotEnoughBalance(
      getIsNotEnoughBalance(
        walletBalances!,
        Number(value),
        fromAsset,
        isWrongNetwork
      )
    );
    onDebouncedQuote({
      recipient,
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      amount: Number(value),
    });
  };

  return {
    amountIn,
    amountOut,
    isNotEnoughBalance,
    onAmountInChange,
    getParsedAmountIn,
    getParsedAmountOut,
    setIsNotEnoughBalance,
    setAmountIn,
    setAmountOut,
  };
}

export default useAmountInput;
