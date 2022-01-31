import { BaseResponseDto } from "../common/dtos";
import { fetchWrapper } from "../helpers/fetchWrapper";
import "dotenv/config";
const { REACT_APP_API_URL } = process.env;

export const checkAllowance = async (
  chainId: number,
  owner: string,
  spender: string,
  tokenAddress: string
): Promise<BaseResponseDto> => {
  try {
    const response: any = await fetchWrapper.get(
      `${REACT_APP_API_URL}/approval/check-allowance?chainId=${chainId}&owner=${owner}&spender=${spender}&tokenAddress=${tokenAddress}`
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

export const buildApprovalTx = async (
  chainId: number,
  owner: string,
  spender: string,
  tokenAddress: string,
  amount: number
): Promise<BaseResponseDto> => {
  try {
    const response: any = await fetchWrapper.get(
      `${REACT_APP_API_URL}/approval/build-tx?chainId=${chainId}&owner=${owner}&spender=${spender}&tokenAddress=${tokenAddress}&amount=${amount}`
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
