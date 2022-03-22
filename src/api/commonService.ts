import { ChainResponseDto, TokenResponseDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { getAllChainsUrl, getBridgeTokensUrl } from "./apiRoutes";

/**
 * Fetch all tokens available on the chain
 * @param chainId
 */
export const getBridgeTokens = async (
  chainId: number
): Promise<TokenResponseDto[]> => {
  const response = await fetchWrapper.get(getBridgeTokensUrl(chainId));
  return await response.json();
};

/**
 * Fetch all chains available for bridging
 */
export const getAllChains = async (): Promise<ChainResponseDto[]> => {
  const response = await fetchWrapper.get(getAllChainsUrl());
  return await response.json();
};
