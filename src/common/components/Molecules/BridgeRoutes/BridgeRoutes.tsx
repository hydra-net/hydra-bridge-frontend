import React, { ReactNode, useCallback, useMemo } from "react";
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

  /**
   * Memo styles to avoid useless re-renders with inline styles
   */
  const memoStylesLabel = useMemo(
    () => ({ width: "100%", textAlign: "left" }),
    []
  );
  const memoStylesSkeleton = useMemo(() => ({ marginBottom: "1rem" }), []);

  const renderHeader = (): ReactNode =>
    useCallback(
      () => (
        <FlexWrapper
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Label margin={"0"} style={memoStylesLabel}>
            {t("available-routes")}
          </Label>
          <RoundedBubble>{routes.length || 0}</RoundedBubble>
        </FlexWrapper>
      ),
      []
    );
  const renderContent = (): ReactNode =>
    useCallback(() => {
      return inProgress ? (
        <>
          <RectangleSkeleton
            className={"rectangle-skeleton"}
            height={"10rem"}
            style={memoStylesSkeleton}
          />
          <RectangleSkeleton
            className={"rectangle-skeleton"}
            height={"10rem"}
            style={memoStylesSkeleton}
          />
          <RectangleSkeleton
            className={"rectangle-skeleton"}
            height={"10rem"}
          />
        </>
      ) : (
        <RouteList
          routes={routes}
          selectedRouteId={selectedRouteId!}
          onRouteSelect={onRouteSelect}
        />
      );
    }, []);

  return (
    <Container type={ContainerType.XXXL} noGutter={true}>
      <Accordion header={renderHeader()} content={renderContent()} />
    </Container>
  );
};

export default React.memo(BridgeRoutes);
