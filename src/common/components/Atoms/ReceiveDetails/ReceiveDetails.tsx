import React from "react";
import { useTranslation } from "react-i18next";

import Icon from "../../Icon/Icon";
import { ReceiveDetailsRow, StyledReceiveDetailsParagraph } from "./styles";

import { IconKeys } from "../../../commonTypes";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

type ReceiveDetailsProps = {
  iconKey: IconKeys;
  chainName: string;
  gasFees: number;
  serviceTime: number;
  transactionFees: string;
  slippage: string;
  amountOut: string;
};

const ReceiveDetails = ({
  iconKey,
  chainName,
  gasFees,
  serviceTime,
  transactionFees,
  slippage,
  amountOut,
}: ReceiveDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <ReceiveDetailsRow hasBottomBorder justifyContent={"flex-start"}>
        <Icon name={iconKey} size={"2.2rem"} style={{ margin: "0.8rem 0" }} />
        <StyledReceiveDetailsParagraph
          isWhite
          style={{ fontSize: theme.paragraph.xl, marginLeft: theme.margin.sm }}
        >
          {chainName}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
      <ReceiveDetailsRow hasBottomBorder>
        <StyledReceiveDetailsParagraph>
          {t("gas-fees-time")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite>
          {gasFees}
          {serviceTime}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
      <ReceiveDetailsRow hasBottomBorder>
        <StyledReceiveDetailsParagraph>
          {t("transactions-fees")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite>
          {transactionFees}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
      <ReceiveDetailsRow hasBottomBorder>
        <StyledReceiveDetailsParagraph>
          {t("slippage")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite>
          {slippage}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
      <ReceiveDetailsRow>
        <StyledReceiveDetailsParagraph>
          {t("amount-out")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite>
          {amountOut}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
    </div>
  );
};
export default ReceiveDetails;
