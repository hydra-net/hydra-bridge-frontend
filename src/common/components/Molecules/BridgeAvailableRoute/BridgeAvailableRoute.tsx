import React from "react";
import { ContainerCard } from "../../Atoms/Containers/Container";
import Icon from "../../Icon/Icon";
import {
  StyledBridgeArrow,
  StyledBridgeNetwork,
  StyledBridgeRoute,
  StyledBridgeRouteAmount,
} from "./styles";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import styled from "styled-components";
import { devicesUp } from "../../../../media";

const ResponsiveContainerCard = styled(ContainerCard)`
  padding: 1rem;

  @media only screen and ${devicesUp.md} {
    padding: 2.4rem;
  }
`;
const BridgeAvailableRoute = (props: any) => {
  console.log(props);
  return (
    <ResponsiveContainerCard borderRadius={theme.borderRadius.lg}>
      <StyledBridgeRoute>
        <StyledBridgeRouteAmount>
          <Icon
            name={props.coinSymbol}
            size={"4rem"}
            className={"amount__icon"}
          />
          <span className={"amount__number"}>0.0001</span>
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
            name={props.networkSymbol}
            size={"4rem"}
            className={"network__icon"}
          />
          <p className={"network__name"}>Polygon</p>
        </StyledBridgeNetwork>
        <StyledBridgeArrow>
          <Icon
            name={"doubleArrowRight"}
            size={"2rem"}
            className={"arrow__icon"}
          />
        </StyledBridgeArrow>
        <StyledBridgeRouteAmount rtl={true}>
          <Icon
            name={props.coinSymbol}
            size={"4rem"}
            className={"amount__icon"}
          />
          <span className={"amount__number"}>0.0001</span>
        </StyledBridgeRouteAmount>
      </StyledBridgeRoute>
    </ResponsiveContainerCard>
  );
};

export default BridgeAvailableRoute;
