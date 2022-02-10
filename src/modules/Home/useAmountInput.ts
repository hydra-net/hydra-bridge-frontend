import { useState } from 'react';
import { getIsNotEnoughBalance } from '../../helpers/walletHelper';
import _ from 'lodash';
import { QuoteRequestDto, TokenBalanceDto } from '../../common/dtos';
import { getOnlyNumbersAndDecimalNumbersRegex } from '../../helpers/regexHelper';

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
  const [amountIn, setAmountIn] = useState<number>(0.0);
  const [amountOut, setAmountOut] = useState<number>(0.0);
  const [isNotEnoughBalance, setIsNotEnoughBalance] = useState<boolean>(false);

  const onAmountInChange = (value: string) => {
    let regEx = getOnlyNumbersAndDecimalNumbersRegex();
    if (regEx.test(value)) {
      const parsedInput = Number(value);
      setAmountIn(parsedInput);
      setAmountOut(parsedInput);
      setIsNotEnoughBalance(
        getIsNotEnoughBalance(
          walletBalances!,
          parsedInput,
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
        amount: parsedInput,
      });
    } else {
      const parsedValue = value.replace(/\D/, '');
      const parsedInput = Number(parsedValue);
      setAmountIn(parsedInput);
      setAmountOut(parsedInput);
    }
  };

  return {
    amountIn,
    amountOut,
    isNotEnoughBalance,
    onAmountInChange,
    setIsNotEnoughBalance,
    setAmountIn,
    setAmountOut,
  };
}

export default useAmountInput;
