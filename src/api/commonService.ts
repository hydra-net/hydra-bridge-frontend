import { ChainResponseDto, TokenResponseDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
import { getAllChainsUrl, getBridgeTokensUrl } from "./apiRoutes";
import { handleResponse } from "../helpers/responseHandler";

export const getBridgeTokens = async (
  chainId: number
): Promise<TokenResponseDto[] | undefined> => {
  try {
    const response = await fetchWrapper.get(getBridgeTokensUrl(chainId));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting bridge tokens", e);
    return undefined;
  }
};

export const getAllChains = async (): Promise<
  ChainResponseDto[] | undefined
> => {
  try {
    const response = await fetchWrapper.get(getAllChainsUrl());
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting chains", e);
    return undefined;
  }
};
