import {
  HOP,
  HOP_BRIDGE,
  HOP_BRIDGE_GOERLI,
  POLYGON,
  POLYGON_BRIDGE,
  POLYGON_BRIDGE_GOERLI,
} from "../common/constants";
import { IconKeys } from "../common/commonTypes";

/**
 * Helper to allow to match the bridge name.
 * Later on used to get the the icon key
 * @param bridgeName
 */
export const getBridgeIconName = (bridgeName: string): string => {
  if (bridgeName === POLYGON_BRIDGE || bridgeName === POLYGON_BRIDGE_GOERLI) {
    return POLYGON;
  }

  if (bridgeName === HOP_BRIDGE || bridgeName === HOP_BRIDGE_GOERLI) {
    return HOP;
  }

  return "";
};

/**
 * Helper to easily get the icon key from a bridge
 * @param bridgeName
 */
export const getBridgeIcon = (bridgeName: string): IconKeys =>
  `${bridgeName.toLocaleLowerCase()}Bridge` as IconKeys;

/**
 * Helper to easily get the icon key from a coin
 * @param coinSymbol
 */
export const getCoinIcon = (coinSymbol: string): IconKeys =>
  `${coinSymbol.toLocaleLowerCase()}Coin` as IconKeys;
