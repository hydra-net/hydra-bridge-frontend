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
        <Icon
          name={iconKey}
          size={"2.2rem"}
          style={{ margin: `${theme.margin.default} 0` }}
        />
        <StyledReceiveDetailsParagraph
          isWhite
          margin={`${theme.margin.default} 0 ${theme.margin.default} ${theme.margin.sm}`}
          style={{
            fontSize: theme.paragraph.xl,
          }}
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
        <StyledReceiveDetailsParagraph margin={"0.8rem 0 0 0"}>
          {t("amount-out")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite margin={"0.8rem 0 0 0"}>
          {amountOut}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
    </div>
  );
};
export default ReceiveDetails;
