import { RouteItemProps } from "../../common/components/Molecules/BridgeRoutes/RouteItem";

export const mockRouteItemBaseProps: RouteItemProps = {
  amountIn: "0.0001",
  amountOut: "0.0001",
  coinSymbol: "ethCoin",
  bridgeSymbol: "polygonBridge",
  bridgeDisplayName: "Polygon",
  routeId: 2,
  isSelected: false,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};
