import { TokenBalanceDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
import { getUserBalancesUrl } from "./apiRoutes";
import { handleResponse } from "../helpers/responseHandler";

export const getUserAddressBalances = async (
  address: string,
  chainId: number
): Promise<TokenBalanceDto[] | undefined> => {
  try {
    const response = await fetchWrapper.get(
      getUserBalancesUrl(address, chainId)
    );
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting user balance", e);
  }
};
