import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import RouteItem, { RouteItemContainerCard } from "./RouteItem";
import RouteItemFees from "./RouteItemFees";

import { RouteDto } from "../../../dtos";
import { getBridgeIcon, getCoinIcon } from "../../../../helpers/icons";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { IInlineStyles } from "../../../commonTypes";

const styles: IInlineStyles = {
  routeItemWrapper: { width: "100%", marginBottom: theme.margin.md },
  routeItemContainerCard: { width: "100%", marginBottom: theme.margin.md },
  errorShowingRoutes: {
    fontSize: theme.paragraph.md,
    color: theme.colors.red,
    margin: "auto",
    textAlign: "center" as const,
  },
};

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

  const renderRouteItems = useMemo(() => {
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
          <div key={id} id={`route-${id}`} style={styles.routeItemWrapper}>
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
            style={styles.routeItemContainerCard}
          >
            <p style={styles.errorShowingRoutes}>
              {t("errors.showing-routes")}
            </p>
          </RouteItemContainerCard>
        );
      }
    });
  }, [routes, selectedRouteId]);
  return <>{renderRouteItems}</>;
};
export default React.memo(RouteList);
