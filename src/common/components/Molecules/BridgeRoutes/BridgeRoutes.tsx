import React, { useMemo } from "react";
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
import { IInlineStyles } from "../../../commonTypes";

const styles: IInlineStyles = {
  label: { width: "100%", textAlign: "left" },
  skeleton: { marginBottom: "1rem" },
};

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

  const renderHeader = useMemo(
    () => (
      <FlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Label margin={"0"} style={styles.label}>
          {t("available-routes")}
        </Label>
        <RoundedBubble>{routes.length || 0}</RoundedBubble>
      </FlexWrapper>
    ),
    [routes]
  );
  const renderContent = useMemo(() => {
    return inProgress ? (
      <>
        <RectangleSkeleton
          className={"rectangle-skeleton"}
          height={"10rem"}
          style={styles.label}
        />
        <RectangleSkeleton
          className={"rectangle-skeleton"}
          height={"10rem"}
          style={styles.skeleton}
        />
        <RectangleSkeleton className={"rectangle-skeleton"} height={"10rem"} />
      </>
    ) : (
      <RouteList
        routes={routes}
        selectedRouteId={selectedRouteId!}
        onRouteSelect={onRouteSelect}
      />
    );
  }, [routes, selectedRouteId, inProgress]);

  return (
    <Container type={ContainerType.XXXL} noGutter={true}>
      {/*
      TODO 1 Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
      */}
      <Accordion header={renderHeader} content={renderContent} />
    </Container>
  );
};

export default React.memo(BridgeRoutes);
