import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import RouteItem from "./RouteItem";
import RouteItemFees from "./RouteItemFees";

import { RouteDto } from "../../../dtos";
import { getBridgeIcon, getCoinIcon } from "../../../../helpers/icons";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 100%;
  font-size: ${theme.paragraph.md};
  text-align: center;
  color: ${theme.colors.black};

  @media only screen and ${devicesUp.md} {
    font-size: ${theme.paragraph.lg};
  }
`;

export type BridgeRouteListProps = {
  routes: RouteDto[];
  selectedRouteId?: number;
  onRouteSelect: (routeId: number) => void;
};

const RouteList = ({
  routes,
  selectedRouteId,
  onRouteSelect,
}: BridgeRouteListProps) => {
  const { t } = useTranslation();

  const renderRouteItems = () => {
    try {
      const routeList: ReactNode = routes.map((route: RouteDto) => {
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
      });
      return routeList;
    } catch (err) {
      return (
        <StyledDiv style={{ height: "10rem" }}>
          {t("error-showing-routes")}
        </StyledDiv>
      );
    }
  };

  return <>{renderRouteItems()}</>;
};

export default RouteList;
