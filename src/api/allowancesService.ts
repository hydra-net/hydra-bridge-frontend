import {
  BuildAllowanceRequestDto,
  BuildAllowanceResponseDto,
} from "../common/dtos";
import { getBuildApprovalTxUrl } from "./apiRoutes";
import { fetchWrapper } from "../helpers/fetchWrapper";

export const buildApprovalTx = async (
  dto: BuildAllowanceRequestDto
): Promise<BuildAllowanceResponseDto> => {
  const response = await fetchWrapper.get(getBuildApprovalTxUrl(dto));
  return await response.json();
};
