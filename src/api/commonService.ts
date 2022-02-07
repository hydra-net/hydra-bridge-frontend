import {
  BaseResponseDto,
  ChainResponseDto,
  TokenResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
import { getAllChainsUrl, getBridgeTokensUrl } from "./apiRoutes";
import { handleResponse } from "../helpers/responseHandler";

export const getBridgeTokens = async (
  chainId: number
): Promise<BaseResponseDto<TokenResponseDto[]>> => {
  try {
    const response = await fetchWrapper.get(getBridgeTokensUrl(chainId));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting bridge tokens", e);
    return { success: false, result: [] };
  }
};

export const getAllChains = async (): Promise<
  BaseResponseDto<ChainResponseDto[]>
> => {
  try {
    const response = await fetchWrapper.get(getAllChainsUrl());
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting chains", e);
    return { success: false, result: [] };
  }
};
