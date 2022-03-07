import React from "react";
import { RouteDto } from "../../../dtos";
import RouteItem from "./RouteItem";
import RouteItemFees from "./RouteItemFees";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { getBridgeIcon, getCoinIcon } from "../../../../helpers/icons";

export type BridgeRouteListProps = {
  inProgress: boolean;
  routes: RouteDto[];
  selectedRouteId?: number;
  onRouteSelect: (routeId: number) => void;
};

const RouteList = ({
  routes,
  selectedRouteId,
  onRouteSelect,
}: BridgeRouteListProps) => {
  const renderRouteItems = () => {
    try {
      const routeList = routes.map((route: RouteDto) => {
        // const routo = _.cloneDeep(route);
        // @ts-ignore
        // delete routo.bridgeRoute;
        const {
          id,
          transactionCoastUsd,
          bridgeRoute: {
            amountIn,
            amountOut,
            bridgeName,
            fromAsset: { symbol },
            bridgeInfo: { displayName, serviceTime },
          },
        } = route;

        const coinSymbol = getCoinIcon(symbol);
        const bridgeSymbol = getBridgeIcon(bridgeName);

        return (
          <div key={id} style={{ marginBottom: theme.margin.sm }}>
            <RouteItem
              coinSymbol={coinSymbol}
              bridgeSymbol={bridgeSymbol}
              amountIn={amountIn}
              amountOut={amountOut}
              bridgeDisplayName={displayName}
              routeId={id}
              isSelected={selectedRouteId === id}
              onRouteSelect={onRouteSelect}
            >
              <RouteItemFees
                transactionCostInUsd={transactionCoastUsd}
                serviceTime={serviceTime}
              />
            </RouteItem>
          </div>
        );
      });
      return routeList;
    } catch (err) {
      return <div>ERROR</div>;
    }
  };
  return <div>{renderRouteItems()}</div>;
};

export default RouteList;
