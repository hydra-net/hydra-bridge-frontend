import {
  BuildAllowanceRequestDto,
  BuildAllowanceResponseDto,
  CheckAllowanceRequestDto,
  CheckAllowanceResponseDto,
} from "../common/dtos";
import { getBuildApprovalTxUrl, getCheckAllowanceUrl } from "./apiRoutes";
import { fetchWrapper } from "../helpers/fetchWrapper";

// TODO NOT USED ?
export const checkAllowance = async (
  dto: CheckAllowanceRequestDto
): Promise<CheckAllowanceResponseDto> => {
  const response = await fetchWrapper.get(getCheckAllowanceUrl(dto));
  return await response.json();
};

export const buildApprovalTx = async (
  dto: BuildAllowanceRequestDto
): Promise<BuildAllowanceResponseDto> => {
  const response = await fetchWrapper.get(getBuildApprovalTxUrl(dto));
  return await response.json();
};
