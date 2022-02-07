import {
  BaseResponseDto,
  BuildAllowanceRequestDto,
  BuildAllowanceResponseDto,
  CheckAllowanceRequestDto,
  CheckAllowanceResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
import { getBuildApprovalTxUrl, getCheckAllowanceUrl } from "./apiRoutes";
import { handleResponse } from "../helpers/responseHandler";

export const checkAllowance = async (
  dto: CheckAllowanceRequestDto
): Promise<BaseResponseDto<CheckAllowanceResponseDto>> => {
  try {
    const response = await fetchWrapper.get(getCheckAllowanceUrl(dto));
    return await handleResponse(response);
  } catch (e) {
    console.log("Error check allowance", e);
    return { success: false, result: undefined };
  }
};

export const buildApprovalTx = async (
  dto: BuildAllowanceRequestDto
): Promise<BaseResponseDto<BuildAllowanceResponseDto>> => {
  try {
    const response = await fetchWrapper.get(getBuildApprovalTxUrl(dto));
    return handleResponse(response);
  } catch (e) {
    console.log("Error building approval transaction", e);
    return { success: false, result: undefined };
  }
};
