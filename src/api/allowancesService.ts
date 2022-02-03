import {
  BaseResponseDto,
  BuildAllowanceResponseDto,
  CheckAllowanceResponseDto,
} from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
const { REACT_APP_API_URL } = process.env;

export const checkAllowance = async (
  chainId: number,
  owner: string,
  tokenAddress: string
): Promise<BaseResponseDto<CheckAllowanceResponseDto> | undefined> => {
  try {
    const response = await fetchWrapper.get<CheckAllowanceResponseDto>(
      `${REACT_APP_API_URL}/approval/check-allowance?chainId=${chainId}&owner=${owner}&tokenAddress=${tokenAddress}`
    );

    return response.result ?? undefined;
  } catch (e) {
    console.log("Error check allowance", e);
  }
};

export const buildApprovalTx = async (
  chainId: number,
  owner: string,
  tokenAddress: string,
  amount: number
): Promise<BaseResponseDto<BuildAllowanceResponseDto> | undefined> => {
  try {
    const response = await fetchWrapper.get<BuildAllowanceResponseDto>(
      `${REACT_APP_API_URL}/approval/build-tx?chainId=${chainId}&owner=${owner}&tokenAddress=${tokenAddress}&amount=${amount}`
    );
    return response.result ?? undefined;
  } catch (e) {
    console.log("Error building approval transaction", e);
  }
};
