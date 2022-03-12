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
 * Helper to easily get the icon key from a bridge
 * @param initialBridgeName
 * @return the bridge icon
 */
export const getBridgeIcon = (initialBridgeName: string): IconKeys => {
  let bridgeName = initialBridgeName;
  if (bridgeName === POLYGON_BRIDGE || bridgeName === POLYGON_BRIDGE_GOERLI) {
    bridgeName = POLYGON;
  }

  if (bridgeName === HOP_BRIDGE || bridgeName === HOP_BRIDGE_GOERLI) {
    bridgeName = HOP;
  }

  return `${bridgeName.toLocaleLowerCase()}Bridge` as IconKeys;
};

/**
 * Helper to easily get the icon key from a coin
 * @param coinSymbol
 * @return the coin icon
 */
export const getCoinIcon = (coinSymbol: string): IconKeys =>
  `${coinSymbol.toLocaleLowerCase()}Coin` as IconKeys;
