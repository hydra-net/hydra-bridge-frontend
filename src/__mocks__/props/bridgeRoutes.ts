import { RouteItemProps } from "../../common/components/Molecules/BridgeRoutes/RouteItem";
import QuoteResponseDtoMock from "../fromResponse/QuoteResponseDto.json";
import { RouteListProps } from "../../common/components/Molecules/BridgeRoutes/RouteList";

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

export const mockRouteListBaseProps: RouteListProps = {
  routes: QuoteResponseDtoMock.routes,
  selectedRouteId: QuoteResponseDtoMock.routes[0].id,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};
