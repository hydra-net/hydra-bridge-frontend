import {
  BaseResponseDto,
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
): Promise<BaseResponseDto<BuildTxResponseDto>> => {
  try {
    const response = await fetchWrapper.get(getBuildTxRequestUrl(dto));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error building bridge tx", e);
    return { success: false, result: undefined };
  }
};

export const getQuote = async (
  dto: QuoteRequestDto
): Promise<BaseResponseDto<QuoteResponseDto>> => {
  try {
    const response = await fetchWrapper.get(getQuoteUrl(dto));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error getting quote", e);
    return { success: false, result: undefined };
  }
};
