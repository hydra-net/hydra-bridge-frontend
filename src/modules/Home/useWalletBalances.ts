import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getUserAddressBalances } from "../../api/balancesService";
import { TokenBalanceDto } from "../../common/dtos";
import { handleError } from "../../helpers/error";

const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

function useWalletBalances(address: string, chainId: number) {
  const [walletBalances, setWalletBalances] = useState<TokenBalanceDto[]>([]);
  const { t } = useTranslation();

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
      } catch (err) {
        handleError(t("error-checking-wallet-balance"), err);
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
