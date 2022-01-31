import styled from "styled-components";
import { RouteDto } from "../../dtos";
import {
  getFlexCenter,
  getFlexStart,
  getVerticalGap,
} from "../../styles";
import LoadingSpinner from "../LoadingSpinner";
import BridgeRoute from "./BridgeRoute";

const Root = styled.div`
  margin-top: 10px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 24px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  padding: 10px;
`;

const TitleContainer = styled.div`
  ${getFlexStart};
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.heading.xs};
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  ${getVerticalGap("5px")};
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  display: flex;
  ${getFlexCenter};
`;

type Props = {
  inProgress: boolean;
  routes: RouteDto[];
  selectedRouteId?: number;
  onRouteSelect: (routeId: number) => void;
};
const BridgeRoutes = ({
  routes,
  inProgress,
  selectedRouteId,
  onRouteSelect,
}: Props) => {


  return (
    <Root>
      <TitleContainer>
        <Title>Available routes:</Title>
      </TitleContainer>
      {inProgress ? (
        <SpinnerContainer>
          <LoadingSpinner style={{ color: "black" }} />
        </SpinnerContainer>
      ) : (
        <Container>
          {routes.map((route: RouteDto) => {
            return (
              <BridgeRoute
                key={route.id}
                route={route}
                selectedRouteId={selectedRouteId!}
                onRouteSelect={onRouteSelect}
              />
            );
          })}
        </Container>
      )}
    </Root>
  );
};

export default BridgeRoutes;
