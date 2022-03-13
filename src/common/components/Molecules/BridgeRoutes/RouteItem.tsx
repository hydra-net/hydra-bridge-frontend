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
  hasChildren?: boolean;
  hasError?: boolean;
}>`
  min-height: ${(props) =>
    props.hasChildren ? "10rem" : props.hasError ? "10rem" : "auto"};
  padding: 1rem;
  background-color: ${(props) =>
    props.isSelected ? theme.colors.gray.dark : theme.colors.blue.darkest};
  box-shadow: ${theme.boxShadow.sm};
  border-radius: ${theme.borderRadius.lg};

  &:hover,
  &:focus {
    background-color: ${theme.colors.gray.dark};
  }
  @media only screen and ${devicesUp.md} {
    padding: 1.8rem 1.8rem 0.8rem 1.8rem !important;
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
            <Icon
              name={coinSymbol}
              width={"2.8rem"}
              height={"3.2rem"}
              className={"amount__icon"}
            />
            <span className={"amount__number"}>{amountIn}</span>
          </StyledBridgeRouteAmount>
          <StyledBridgeArrow>
            {/* TODO 44 integrate font awesome in next PR and replace */}
            <Icon
              name={"doubleArrowRight"}
              width={"2.1rem"}
              height={"1.8rem"}
              className={"arrow__icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeChain>
            <Icon
              name={bridgeSymbol}
              width={"2.6rem"}
              height={"2.6rem"}
              className={"chain__icon chain__icon--sm"}
            />
            <p className={"chain__name"}>{bridgeDisplayName}</p>

            <div className={"chain__group"}>
              <span>
                <Icon
                  name={bridgeSymbol}
                  width={"2.6rem"}
                  height={"2.6rem"}
                  className={"network__icon"}
                />
              </span>
              <span>{bridgeDisplayName}</span>
            </div>
          </StyledBridgeChain>
          <StyledBridgeArrow>
            {/* TODO 44 integrate font awesome in next PR and replace */}
            <Icon
              name={"doubleArrowRight"}
              width={"2.1rem"}
              height={"1.8rem"}
              className={"arrow__icon"}
            />
          </StyledBridgeArrow>
          <StyledBridgeRouteAmount rtl={true}>
            <Icon
              name={coinSymbol}
              width={"2.8rem"}
              height={"3.2rem"}
              className={"amount__icon"}
            />
            <span className={"amount__number"}>{amountOut}</span>
          </StyledBridgeRouteAmount>
        </StyledBridgeRoute>
        {children}
      </RouteItemContainerCard>
    </CustomFakeButton>
  );
};

export default RouteItem;
