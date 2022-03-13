import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import RouteList from "./RouteList";
import { RectangleSkeleton } from "../../Atoms/Skelletons/styles";
import { Container } from "../../Atoms/Containers/Container";
import { ContainerType } from "../../../enums";
import { InputLabel as Label } from "../../Atoms/Label/Label";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import Accordion from "../Accordion/Accordion";
import RoundedBubble from "../../Atoms/RoundedBubble/RoundedBubble";

import { RouteDto } from "../../../dtos";
import { AccordionHeader } from "../Accordion/AccordionHeaders";
import { AccordionContent } from "../Accordion/styles";

export type BridgeRoutesProps = {
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
}: BridgeRoutesProps) => {
  const { t } = useTranslation();

  const renderHeader = (): ReactNode => (
    <AccordionHeader>
      <FlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Label margin={"0"} style={{ width: "100%", textAlign: "left" }}>
          {t("available-routes")}
        </Label>
        <RoundedBubble>{routes.length || 0}</RoundedBubble>
      </FlexWrapper>
    </AccordionHeader>
  );
  const renderContent = (): ReactNode => {
    return inProgress ? (
      <AccordionContent>
        <RectangleSkeleton
          className={"rectangle-skeleton"}
          height={"10rem"}
          style={{ marginBottom: "1rem" }}
        />
        <RectangleSkeleton
          className={"rectangle-skeleton"}
          height={"10rem"}
          style={{ marginBottom: "1rem" }}
        />
        <RectangleSkeleton className={"rectangle-skeleton"} height={"10rem"} />
      </AccordionContent>
    ) : (
      <AccordionContent>
        <RouteList
          routes={routes}
          selectedRouteId={selectedRouteId!}
          onRouteSelect={onRouteSelect}
        />
      </AccordionContent>
    );
  };

  return (
    <Container type={ContainerType.XXXL} noGutter={true}>
      <Accordion header={renderHeader()} content={renderContent()} />
    </Container>
  );
};

export default BridgeRoutes;
