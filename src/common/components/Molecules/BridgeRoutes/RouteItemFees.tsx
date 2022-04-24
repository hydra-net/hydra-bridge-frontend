import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContainerCard } from "../../Atoms/Containers/Container";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import {
  formatGasFees,
  formatServiceTime,
} from "../../../../helpers/formatsHelper";

const StyledText = styled.p`
  color: ${theme.colors.white};
  font-size: ${theme.paragraph.xs};
  margin: 0;
  min-width: 15rem;
  padding: 0.5rem 1.2rem;
`;

export type RouteItemFeesProps = {
  transactionCostInUsd: number;
  serviceTime: number;
};
const RouteItemFees = ({
  transactionCostInUsd,
  serviceTime,
}: RouteItemFeesProps) => {
  const { t } = useTranslation();

  return (
    <ContainerCard
      borderRadius={theme.borderRadius.lg}
      padding={"0"}
      bg={theme.colors.gray["medium-dark"]}
      boxShadow={theme.boxShadow.sm}
    >
      <StyledText data-testid="route-fees">
        {t("gas-fee")} : ~${formatGasFees(transactionCostInUsd)} | ~
        {React.useCallback(() => formatServiceTime(serviceTime), [])} {t("min")}
      </StyledText>
    </ContainerCard>
  );
};

export default React.memo(RouteItemFees);
