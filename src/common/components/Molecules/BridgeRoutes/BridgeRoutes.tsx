import RouteList from "./RouteList";
import { RectangleSkeleton } from "../../Atoms/Skelletons/styles";
import { Container } from "../../Atoms/Containers/Container";
import { ContainerType } from "../../../enums";
import { InputLabel as Label } from "../../Atoms/Label/Label";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import Accordion from "../Accordion/Accordion";

import { RouteDto } from "../../../dtos";
import RoundedBubble from "../../Atoms/RoundedBubble/RoundedBubble";
import React, { ReactNode } from "react";
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
  const renderHeader = (): ReactNode => (
    <FlexWrapper
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Label margin={"0"}>Hello</Label>
      <RoundedBubble>3</RoundedBubble>
    </FlexWrapper>
  );
  const renderContent = (): ReactNode => {
    return inProgress ? (
      <>
        <RectangleSkeleton height={"10rem"} style={{ marginBottom: "1rem" }} />
        <RectangleSkeleton height={"10rem"} style={{ marginBottom: "1rem" }} />
        <RectangleSkeleton height={"10rem"} />
      </>
    ) : (
      <RouteList
        routes={routes}
        selectedRouteId={selectedRouteId!}
        onRouteSelect={onRouteSelect}
      />
    );
  };

  return (
    <Container type={ContainerType.XXXL} noGutter={true}>
      <Accordion header={renderHeader()} content={renderContent()} />
    </Container>
  );
};

export default BridgeRoutes;
