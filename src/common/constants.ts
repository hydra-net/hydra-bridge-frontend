import { SupportedChainId } from "./enums";

export const ETH = "eth";
export const USDC = "usdc";
export const POLYGON_BRIDGE = "polygon-bridge";
export const POLYGON_BRIDGE_GOERLI = "polygon-bridge-goerli";
export const POLYGON = "polygon";
export const HOP_BRIDGE = "hop-bridge";
export const HOP_BRIDGE_GOERLI = "hop-bridge-goerli";
export const HOP = "hop";

export const NETWORK_EXPLORER_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://etherscan.io/`,
  [SupportedChainId.GOERLI]: `https://goerli.etherscan.io`,
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];
