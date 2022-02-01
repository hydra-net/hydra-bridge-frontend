import {
    localStorageHelper,
    LocalStorageKeys,
  } from "./localStorageHelper";
  
  export const walletHelper = {
    getLocalWallets: () => {
      return localStorageHelper.get(LocalStorageKeys.wallets) || [];
    },
    setLocalWallets: (wallets: string[]) => {
      return localStorageHelper.set(LocalStorageKeys.wallets, wallets);
    },
  };