import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContainerCard } from "../../Atoms/Containers/Container";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

const StyledText = styled.p`
  color: ${theme.colors.white};
  font-size: ${theme.paragraph.sm};
  margin: 0;
  min-width: 15rem;
  padding: 0.8rem;
`;

export type BridgeRouteItemFeesProps = {
  transactionCostInUsd: number;
  serviceTime: number;
};
const BridgeRouteItemFees = ({
  transactionCostInUsd,
  serviceTime,
}: BridgeRouteItemFeesProps) => {
  const { t } = useTranslation();

  // TODO TEST
  const getGasFee = () =>
    // eg: round(0.39979797399225586 * 100) = 40 / 100 = 0.4 to fixed(2) = 0.40
    (Math.round(transactionCostInUsd * 100) / 100).toFixed(2);

  // TODO TEST
  const getServiceTimeOutput = () => `~ ${serviceTime / 60} min`;
  return (
    <ContainerCard borderRadius={theme.borderRadius.xxl} padding={"0"}>
      <StyledText>
        {t("gas-fee")} : ~ {getGasFee()} $ | {getServiceTimeOutput()}
      </StyledText>
    </ContainerCard>
  );
};

export default BridgeRouteItemFees;
