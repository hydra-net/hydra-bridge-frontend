import {
  BaseResponseDto,
  BuildTxRequestDto,
  BuildTxResponseDto,
  QuoteRequestDto,
  QuoteResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";

const { REACT_APP_API_URL } = process.env;

export const buildBridgeTx = async (
  dto: BuildTxRequestDto
): Promise<BaseResponseDto<BuildTxResponseDto> | undefined> => {
  try {
    const response = await fetchWrapper.get<BuildTxResponseDto>(
      `${REACT_APP_API_URL}/bridge/build-tx?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}&routeId=${dto.routeId}`
    );

    return response.result ?? undefined;
  } catch (e) {
    console.log("Error building bridge tx", e);
  }
};

export const getQuote = async (
  dto: QuoteRequestDto
): Promise<BaseResponseDto<QuoteResponseDto> | undefined> => {
  try {
    const response = await fetchWrapper.get<QuoteResponseDto>(
      `${REACT_APP_API_URL}/bridge/quote?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}`
    );
    return response.result ?? undefined;
  } catch (e) {
    console.log("Error getting quote", e);
  }
};
