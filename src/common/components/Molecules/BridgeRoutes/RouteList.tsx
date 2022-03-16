import React from "react";
import { useTranslation } from "react-i18next";

import RouteItem, { RouteItemContainerCard } from "./RouteItem";
import RouteItemFees from "./RouteItemFees";

import { RouteDto } from "../../../dtos";
import { getBridgeIcon, getCoinIcon } from "../../../../helpers/icons";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type RouteListProps = {
  routes: RouteDto[];
  selectedRouteId?: number;
  onRouteSelect: (routeId: number) => void;
};

const RouteList = ({
  routes,
  selectedRouteId,
  onRouteSelect,
}: RouteListProps) => {
  const { t } = useTranslation();

  const renderRouteItems = () => {
    return routes.map((route: RouteDto) => {
      try {
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
          <div
            key={id}
            id={`route-${id}`}
            style={{ width: "100%", marginBottom: theme.margin.md }}
          >
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
      } catch (err) {
        console.warn(
          "Couldn't access required values from routes to display it",
          route
        );
        return (
          <RouteItemContainerCard
            key={route?.id}
            isSelected={false}
            hasError={true}
            style={{ width: "100%", marginBottom: theme.margin.md }}
          >
            <p
              style={{
                fontSize: theme.paragraph.md,
                color: theme.colors.red,
                margin: "auto",
                textAlign: "center",
              }}
            >
              {t("error-showing-routes")}
            </p>
          </RouteItemContainerCard>
        );
      }
    });
  };
  return <>{renderRouteItems()}</>;
};
export default RouteList;
