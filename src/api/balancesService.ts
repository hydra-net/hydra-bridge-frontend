import { TokenBalanceDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { getUserBalancesUrl } from "./apiRoutes";

/**
 * API call to retrieve the user balance on a particular chain
 * @param address
 * @param chainId
 */
export const getUserAddressBalances = async (
  address: string,
  chainId: number
): Promise<TokenBalanceDto[]> => {
  const response = await fetchWrapper.get(getUserBalancesUrl(address, chainId));
  return await response.json();
};
