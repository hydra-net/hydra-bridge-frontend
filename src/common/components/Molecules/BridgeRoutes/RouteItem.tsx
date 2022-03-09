import React, { ReactNode } from "react";
import styled from "styled-components";

import Icon from "../../Icon/Icon";
import { ContainerCard } from "../../Atoms/Containers/Container";
import {
  StyledBridgeArrow,
  StyledBridgeChain,
  StyledBridgeRoute,
  StyledBridgeRouteAmount,
} from "./styles";
import { FakeButton } from "../../Atoms/Buttons/Button";

import { IconKeys } from "../../../commonTypes";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";

const CustomFakeButton = styled(FakeButton)<{
  hasBoxShadow?: boolean;
}>`
  &:focus,
  &:focus-within {
    background-color: ${theme.colors.blue.darker};
  }
`;
export const RouteItemContainerCard = styled(ContainerCard)<{
  isSelected: boolean;
  hasChildren: boolean;
}>`
  min-height: ${(props) => (props.hasChildren ? "10rem" : "auto")};
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  background-color: ${(props) =>
    props.isSelected ? theme.colors.blue.darker : theme.colors.blue.darkest};

  &:hover,
  &:focus {
    background-color: ${theme.colors.blue.darker};
  }
  @media only screen and ${devicesUp.md} {
    padding: 1.4rem 2.4rem;
  }
`;

export type BridgeRouteItemProps = {
  coinSymbol: IconKeys;
  bridgeSymbol: IconKeys;
  amountIn: string | number;
  amountOut: string | number;
  bridgeDisplayName: string;
  routeId: number;
  isSelected: boolean;
  onRouteSelect: (id: number) => void;
  children?: ReactNode;
};

const RouteItem = ({
  coinSymbol,
  bridgeSymbol,
  amountIn,
  amountOut,
  bridgeDisplayName,
  routeId,
  isSelected,
  onRouteSelect,
  children,
}: BridgeRouteItemProps) => {
  return (
    <CustomFakeButton
      ariaLabel={"select route"}
      hasBoxShadow={true}
      onClick={() => onRouteSelect(routeId)}
    >
      <RouteItemContainerCard isSelected={isSelected} hasChildren={!!children}>
        <StyledBridgeRoute>
          <StyledBridgeRouteAmount data-testid={"route-first-amount"}>
            <Icon name={coinSymbol} size={"4rem"} className={"amount__icon"} />
            <span className={"amount__number"}>{amountIn}</span>
          </StyledBridgeRouteAmount>
          <StyledBridgeArrow>
            <Icon
              name={"doubleArrowRight"}
              size={"2rem"}
              className={"arrow__icon"}
              data-testid={"route-first-arrow-icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeChain data-testid={"route-bridge-chain"}>
            <Icon
              name={bridgeSymbol}
              size={"4rem"}
              className={"bridge__icon"}
            />
            <p className={"bridge__name"}>{bridgeDisplayName}</p>
          </StyledBridgeChain>
          <StyledBridgeArrow>
            <Icon
              name={"doubleArrowRight"}
              size={"2rem"}
              className={"arrow__icon"}
              data-testid={"route-second-arrow-icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeRouteAmount
            rtl={true}
            data-testid={"route-second-amount"}
          >
            <Icon name={coinSymbol} size={"4rem"} className={"amount__icon"} />
            <span className={"amount__number"}>{amountOut}</span>
          </StyledBridgeRouteAmount>
        </StyledBridgeRoute>
        {children}
      </RouteItemContainerCard>
    </CustomFakeButton>
  );
};

export default RouteItem;
