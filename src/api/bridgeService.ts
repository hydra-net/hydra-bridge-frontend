import {
  BaseResponseDto,
  BuildTxRequestDto,
  QuoteRequestDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";

const { REACT_APP_API_URL } = process.env;

export const buildBridgeTx = async (
  dto: BuildTxRequestDto
): Promise<BaseResponseDto> => {
  try {
    const response: any = await fetchWrapper.get(
      `${REACT_APP_API_URL}/bridge/build-tx?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}&routeId=${dto.routeId}`
    );

    return response.result;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      result: null,
    };
  }
};

export const getQuote = async (
  dto: QuoteRequestDto
): Promise<BaseResponseDto> => {
  try {
    const response: any = await fetchWrapper.get(
      `${REACT_APP_API_URL}/bridge/quote?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}`
    );
    return response.result;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      result: null,
    };
  }
};
