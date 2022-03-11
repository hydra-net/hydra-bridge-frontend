import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContainerCard } from "../../Atoms/Containers/Container";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

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

  const getGasFee = () =>
    // eg: round(0.39979797399225586 * 100) = 40 / 100 = 0.4 to fixed(2) = 0.40
    (Math.round(transactionCostInUsd * 100) / 100).toFixed(2);

  const getServiceTimeOutput = () => `~ ${serviceTime / 60} min`;
  return (
    <ContainerCard
      borderRadius={theme.borderRadius.lg}
      padding={"0"}
      bg={theme.colors.gray["medium-dark"]}
      boxShadow={theme.boxShadow.sm}
    >
      <StyledText data-testid="route-fees">
        {t("gas-fee")} : ~ {getGasFee()} $ | {getServiceTimeOutput()}
      </StyledText>
    </ContainerCard>
  );
};

export default RouteItemFees;
