import { Web3Provider } from "@chainsafe/web3-context";
import { ReactNode } from "react";
import { walletHelper } from "../../helpers/walletHelper";
import { ALL_SUPPORTED_CHAIN_IDS } from "../constants";

const wallets = [{ walletName: "metamask", preferred: true }];

interface Web3WrapperProps {
  children: ReactNode;
}

const Web3Wrapper = ({ children }: Web3WrapperProps) => {
  return (
    <Web3Provider
      networkIds={ALL_SUPPORTED_CHAIN_IDS}
      onboardConfig={{
        darkMode: true,

        walletSelect: {
          wallets,
        },
        subscriptions: {
          wallet: (wallet) => {
            if (wallet) {
              // append wallet to wallet list
              const walletList = walletHelper.getLocalWallets();
              if (wallet.name && !walletList.includes(wallet.name)) {
                walletList.push(wallet.name!);
              }
              walletHelper.setLocalWallets(walletList);
            }
          },
        },
      }}
    >
      {children}
    </Web3Provider>
  );
};

export default Web3Wrapper;
