import styled from "styled-components";
import { RouteDto } from "../../dtos";
import { getFlexStart } from "../../styles";
import RouteList from "../Molecules/BridgeRouteList/RouteList";
import { RectangleSkeleton } from "../Atoms/Skelletons/styles";

const Root = styled.div`
  margin-top: 10px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 1%) 0 0 1px, rgb(0 0 0 / 4%) 0 4px 8px,
    rgb(0 0 0 / 4%) 0 16px 24px, rgb(0 0 0 / 1%) 0 24px 32px;
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
        <RectangleSkeleton height={"10rem"} />
      ) : (
        <RouteList
          routes={routes}
          selectedRouteId={selectedRouteId!}
          onRouteSelect={onRouteSelect}
        />
      )}
    </Root>
  );
};

export default BridgeRoutes;
