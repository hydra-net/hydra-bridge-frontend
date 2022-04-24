import React, { useCallback, useMemo } from "react";
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
  /**
   * Memo styles to avoid useless re-renders with inline styles
   */
  const memoStylesRouteItemWrapper = useMemo(
    () => ({ width: "100%", marginBottom: theme.margin.md }),
    []
  );
  const memoStylesRouteItemContainerCard = useMemo(
    () => ({ width: "100%", marginBottom: theme.margin.md }),
    []
  );
  const memoStylesErrorShowingRoutes = useMemo(
    () => ({
      fontSize: theme.paragraph.md,
      color: theme.colors.red,
      margin: "auto",
      textAlign: "center" as const,
    }),
    []
  );

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
          <div key={id} id={`route-${id}`} style={memoStylesRouteItemWrapper}>
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
            style={memoStylesRouteItemContainerCard}
          >
            <p style={memoStylesErrorShowingRoutes}>
              {t("errors.showing-routes")}
            </p>
          </RouteItemContainerCard>
        );
      }
    });
  };
  return <>{renderRouteItems()}</>;
};
export default React.memo(RouteList);
