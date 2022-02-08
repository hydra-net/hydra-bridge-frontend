import {
  BuildTxRequestDto,
  BuildTxResponseDto,
  QuoteRequestDto,
  QuoteResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
import { getBuildTxRequestUrl, getQuoteUrl } from "./apiRoutes";
import { handleResponse } from "../helpers/responseHandler";

export const buildBridgeTx = async (
  dto: BuildTxRequestDto
): Promise<BuildTxResponseDto | undefined> => {
  try {
    const response = await fetchWrapper.get(getBuildTxRequestUrl(dto));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error building bridge tx", e);
    return undefined;
  }
};

export const getQuote = async (
  dto: QuoteRequestDto
): Promise<QuoteResponseDto | undefined> => {
  try {
    const response = await fetchWrapper.get(getQuoteUrl(dto));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting quote", e);
    return undefined;
  }
};
