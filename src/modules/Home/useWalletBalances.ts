import { useEffect, useState } from "react";
import { getUserAddressBalances } from "../../api/balancesService";
import { TokenBalanceDto } from "../../common/dtos";
import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

function useWalletBalances(address: string, chainId: number) {
  const [walletBalances, setWalletBalances] = useState<TokenBalanceDto[]>([]);

  useEffect(() => {
    async function getWalletBalances() {
      try {
        if (address) {
          const result = await getUserAddressBalances(
            address,
            chainId ?? parseInt(REACT_APP_DEFAULT_NETWORK_ID!)
          );
          if (result && result.length > 0) {
            setWalletBalances(result);
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
