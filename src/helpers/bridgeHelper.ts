import {
  HOP,
  HOP_BRIDGE,
  HOP_BRIDGE_GOERLI,
  POLYGON,
  POLYGON_BRIDGE,
  POLYGON_BRIDGE_GOERLI,
} from '../common/constants';

export const getBridgeIconName = (bridgeName: string): string => {
  if (bridgeName === POLYGON_BRIDGE || bridgeName === POLYGON_BRIDGE_GOERLI) {
    return POLYGON;
  }

  if (bridgeName === HOP_BRIDGE || bridgeName === HOP_BRIDGE_GOERLI) {
    return HOP;
  }

  return '';
};
