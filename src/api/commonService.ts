import {
  BaseResponseDto,
  ChainResponseDto,
  TokenResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";

const { REACT_APP_API_URL } = process.env;

export const getBridgeTokens = async (
  chainId: number
): Promise<BaseResponseDto<TokenResponseDto[]> | undefined> => {
  try {
    const response = await fetchWrapper.get<TokenResponseDto[]>(
      `${REACT_APP_API_URL}/common/tokens?chainId=${chainId}`
    );

    return response.result ?? undefined;
  } catch (e) {
    console.log("Error getting bridge tokens", e);
  }
};

export const getAllChains = async (): Promise<
  BaseResponseDto<ChainResponseDto[]> | undefined
> => {
  try {
    const response: any = await fetchWrapper.get<ChainResponseDto[]>(
      `${REACT_APP_API_URL}/common/chains`
    );
    return response.result ?? undefined;
  } catch (e) {
    console.log("Error getting chains", e);
  }
};
