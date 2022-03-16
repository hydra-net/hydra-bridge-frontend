import { RouteItemProps } from "../../common/components/Molecules/BridgeRoutes/RouteItem";
import { RouteListProps } from "../../common/components/Molecules/BridgeRoutes/RouteList";
import { BridgeRoutesProps } from "../../common/components/Molecules/BridgeRoutes/BridgeRoutes";
import QuoteResponseDtoMock from "../fromResponse/QuoteResponseDto.json";

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

export const mockBridgeRoutesBaseProps: BridgeRoutesProps = {
  routes: QuoteResponseDtoMock.routes,
  selectedRouteId: QuoteResponseDtoMock.routes[0].id,
  inProgress: false,
  onRouteSelect: (id: number) => alert(`on route select id: ${id}`),
};
