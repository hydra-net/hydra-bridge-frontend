
export enum LocalStorageKeys {
  wallets = "wallets",
  selectedWallet = "onboard.selectedWallet",
  modalWarningAccepted = "modalWarningAccepted",
}

export const localStorageHelper = {
  get: (key: LocalStorageKeys): any => {
    let item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }

    return undefined;
  },

  set: (key: LocalStorageKeys, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: LocalStorageKeys): void => {
    localStorage.removeItem(key);
  },


};
