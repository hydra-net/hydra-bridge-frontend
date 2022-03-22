import {
  BuildTxRequestDto,
  BuildTxResponseDto,
  QuoteRequestDto,
  QuoteResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { getBuildTxRequestUrl, getQuoteUrl } from "./apiRoutes";

/**
 * API call to build the transaction request
 * @param dto
 */
export const buildBridgeTx = async (
  dto: BuildTxRequestDto
): Promise<BuildTxResponseDto> => {
  const response = await fetchWrapper.get(getBuildTxRequestUrl(dto));
  return await response.json();
};

/**
 * API call to get a quote with the values provided from the user for bridging
 * @param dto
 */
export const getQuote = async (
  dto: QuoteRequestDto
): Promise<QuoteResponseDto> => {
  const response = await fetchWrapper.get(getQuoteUrl(dto));
  return await response.json();
};
