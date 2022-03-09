import React, { ReactNode } from "react";
import styled from "styled-components";

import Icon from "../../Icon/Icon";
import { ContainerCard } from "../../Atoms/Containers/Container";
import {
  StyledBridgeArrow,
  StyledBridgeNetwork,
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
}>`
  min-height: 10rem;
  padding: 1rem;
  background-color: ${theme.colors.blue.darkest};
  ${(props) =>
    props.isSelected ? `background-color: ${theme.colors.blue.darker}` : ""};
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  z-index: 3;

  &:hover,
  &:focus {
    background-color: ${theme.colors.blue.darker};
  }
  @media only screen and ${devicesUp.md} {
    padding: 1.4rem 2.4rem;
  }
`;

export type RouteItemProps = {
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
}: RouteItemProps) => {
  return (
    <CustomFakeButton
      ariaLabel={"select route"}
      hasBoxShadow={true}
      onClick={() => onRouteSelect(routeId)}
    >
      <RouteItemContainerCard isSelected={isSelected}>
        <StyledBridgeRoute>
          <StyledBridgeRouteAmount>
            <Icon name={coinSymbol} size={"4rem"} className={"amount__icon"} />
            <span className={"amount__number"}>{amountIn}</span>
          </StyledBridgeRouteAmount>
          <StyledBridgeArrow>
            <Icon
              name={"doubleArrowRight"}
              size={"2rem"}
              className={"arrow__icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeNetwork>
            <Icon
              name={bridgeSymbol}
              size={"4rem"}
              className={"network__icon"}
            />
            <p className={"network__name"}>{bridgeDisplayName}</p>
          </StyledBridgeNetwork>
          <StyledBridgeArrow>
            <Icon
              name={"doubleArrowRight"}
              size={"2rem"}
              className={"arrow__icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeRouteAmount rtl={true}>
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
