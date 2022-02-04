import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { TokenBalanceDto } from "../common/dtos";
import { localStorageHelper, LocalStorageKeys } from "./localStorageHelper";

export const walletHelper = {
  getLocalWallets: () => {
    return localStorageHelper.get(LocalStorageKeys.wallets) || [];
  },
  setLocalWallets: (wallets: string[]) => {
    return localStorageHelper.set(LocalStorageKeys.wallets, wallets);
  },
};

export const getIsNotEnoughBalance = (
  walletBalances: TokenBalanceDto[],
  value: number,
  asset: number,
  isWrongNetwork: boolean
) => {
  try {
    const tokenBalanceDto = walletBalances?.find(
      (tokenBalance) => tokenBalance.tokenId === asset
    );
    if (tokenBalanceDto && value && !isWrongNetwork) {
      const parsedAmountToSpend = parseUnits(
        value.toString(),
        tokenBalanceDto.decimals
      );
      const amountInBig = ethers.BigNumber.from(parsedAmountToSpend);
      const balanceBig = ethers.BigNumber.from(tokenBalanceDto.amount);

      return amountInBig.gt(balanceBig);
    }

    return false;
  } catch (e) {
    console.log("Error checking wallet balance");
    return false;
  }
};

export const formatWalletAddress = (isWrongNetwork: boolean, address: string) =>
  !isWrongNetwork
    ? address.substring(0, 6) + "..." + address.substring(38, 42)
    : "Wrong network";
