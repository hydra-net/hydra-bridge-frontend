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
import { UnStyledButton } from "../../Atoms/Buttons/styles";

import { IconKeys } from "../../../commonTypes";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";

const CustomUnStyledButton = styled(UnStyledButton)`
  &:focus,
  &:focus-within {
    background-color: ${theme.colors.blue.darker};
  }
`;
const ResponsiveContainerCard = styled(ContainerCard)`
  padding: 1rem;

  &:hover,
  &:focus {
    background-color: ${theme.colors.blue.darker};
  }
  @media only screen and ${devicesUp.md} {
    padding: 2.4rem;
  }
`;

export type BridgeRouteItemProps = {
  coinSymbol: IconKeys;
  networkSymbol: IconKeys;
  amountIn: string | number;
  amountOut: string | number;
  networkDisplayName: string;
  routeId: number;
  onRouteSelect: (id: number) => void;
  children?: ReactNode;
};

const BridgeRouteItem = ({
  coinSymbol,
  networkSymbol,
  amountIn,
  amountOut,
  networkDisplayName,
  routeId,
  onRouteSelect,
  children,
}: BridgeRouteItemProps) => {
  return (
    <CustomUnStyledButton onClick={() => onRouteSelect(routeId)}>
      <ResponsiveContainerCard borderRadius={theme.borderRadius.lg}>
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
              name={networkSymbol}
              size={"4rem"}
              className={"network__icon"}
            />
            <p className={"network__name"}>{networkDisplayName}</p>
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
      </ResponsiveContainerCard>
    </CustomUnStyledButton>
  );
};

export default BridgeRouteItem;
