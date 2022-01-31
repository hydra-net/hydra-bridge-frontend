import { BaseListResponseDto, TokenBalanceDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";

const { REACT_APP_API_URL } = process.env;

export const getUserAddressBalances = async (
  address: string,
  chainId: number
): Promise<BaseListResponseDto<TokenBalanceDto>> => {
  const response: any = await fetchWrapper.get(
    `${REACT_APP_API_URL}/balances?address=${address}&&chainId=${chainId}`
  );

  return response.result;
};
