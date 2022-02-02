import { useEffect, useState } from "react";
import { getUserAddressBalances } from "../../api/balancesService";
import { TokenBalanceDto } from "../../common/dtos";

const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

function useWalletBalances(address: string, chainId: number) {
  const [walletBalances, setWalletBalances] = useState<TokenBalanceDto[]>([]);

  useEffect(() => {
    async function getWalletBalances() {
      try {
        if (address) {
          const response = await getUserAddressBalances(
            address,
            chainId ?? parseInt(REACT_APP_DEFAULT_NETWORK_ID!)
          );
          if (response && response.success) {
            setWalletBalances(response.result);
          }
        }
      } catch (e) {
        console.log("Wallet balances error", e);
      }
    }
    getWalletBalances();
  }, [address, chainId, setWalletBalances]);

  return {
    walletBalances,
    setWalletBalances,
  };
}

export default useWalletBalances;
