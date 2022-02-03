import { useWeb3 } from "@chainsafe/web3-context";
import { createContext, ReactNode, useContext } from "react";
import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

export interface NetworkValues {
  isWrongNetwork: boolean;
}

export const NetworkContext = createContext<NetworkValues>({
  isWrongNetwork: false,
});

interface ProviderProps {
  children: ReactNode;
}

export const NetworkProvider = ({ children }: ProviderProps) => {
  const { network } = useWeb3();

  return (
    <NetworkContext.Provider
      value={{
        isWrongNetwork: parseInt(REACT_APP_DEFAULT_NETWORK_ID!) !== network,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  return useContext(NetworkContext);
};
