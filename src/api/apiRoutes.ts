import {
  BuildAllowanceRequestDto,
  BuildTxRequestDto,
  CheckAllowanceRequestDto,
  QuoteRequestDto,
} from "../common/dtos";

const { REACT_APP_API_URL } = process.env;

export const getCheckAllowanceUrl = (dto: CheckAllowanceRequestDto) =>
  `${REACT_APP_API_URL}/approval/check-allowance?chainId=${dto.chainId}&owner=${dto.owner}&tokenAddress=${dto.tokenAddress}`;

export const getBuildApprovalTxUrl = (dto: BuildAllowanceRequestDto) =>
  `${REACT_APP_API_URL}/approval/build-tx?chainId=${dto.chainId}&owner=${dto.owner}&tokenAddress=${dto.tokenAddress}&amount=${dto.amount}`;

export const getUserBalancesUrl = (address: string, chainId: number) =>
  `${REACT_APP_API_URL}/balances?address=${address}&&chainId=${chainId}`;

export const getBuildTxRequestUrl = (dto: BuildTxRequestDto) =>
  `${REACT_APP_API_URL}/bridge/build-tx?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}&routeId=${dto.routeId}`;

export const getQuoteUrl = (dto: QuoteRequestDto) =>
  `${REACT_APP_API_URL}/bridge/quote?recipient=${dto.recipient}&fromAsset=${dto.fromAsset}&fromChainId=${dto.fromChainId}&toAsset=${dto.toAsset}&toChainId=${dto.toChainId}&amount=${dto.amount}`;

export const getBridgeTokensUrl = (chainId: number) =>
  `${REACT_APP_API_URL}/common/tokens?chainId=${chainId}`;

export const getAllChainsUrl = () => `${REACT_APP_API_URL}/common/chains`;
