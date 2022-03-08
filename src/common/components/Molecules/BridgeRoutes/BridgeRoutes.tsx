import RouteList from "./RouteList";
import { RectangleSkeleton } from "../../Atoms/Skelletons/styles";
import { Container, ContainerCard } from "../../Atoms/Containers/Container";
import { ContainerType } from "../../../enums";
import { InputLabel as Label } from "../../Atoms/Label/Label";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";

import { RouteDto } from "../../../dtos";
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
    <Container type={ContainerType.XXXL} noGutter={true}>
      <ContainerCard>
        <FlexWrapper alignItems={"flex-start"}>
          <Label>Available routes:</Label>
        </FlexWrapper>
        {inProgress ? (
          <>
            <RectangleSkeleton
              height={"10rem"}
              style={{ marginBottom: "1rem" }}
            />
            <RectangleSkeleton
              height={"10rem"}
              style={{ marginBottom: "1rem" }}
            />
            <RectangleSkeleton height={"10rem"} />
          </>
        ) : (
          <RouteList
            routes={routes}
            selectedRouteId={selectedRouteId!}
            onRouteSelect={onRouteSelect}
          />
        )}
      </ContainerCard>
    </Container>
  );
};

export default BridgeRoutes;
