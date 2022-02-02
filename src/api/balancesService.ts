import { BaseResponseDto, TokenBalanceDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";

const { REACT_APP_API_URL } = process.env;

export const getUserAddressBalances = async (
  address: string,
  chainId: number
): Promise<BaseResponseDto<TokenBalanceDto[]> | undefined> => {
  try {
    const response = await fetchWrapper.get<TokenBalanceDto[]>(
      `${REACT_APP_API_URL}/balances?address=${address}&&chainId=${chainId}`
    );

    return response.result ?? undefined;
  } catch (e) {
    console.log("Error getting user balance", e);
  }
};
