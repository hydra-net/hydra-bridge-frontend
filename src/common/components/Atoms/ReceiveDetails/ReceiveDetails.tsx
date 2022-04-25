import React from "react";
import { useTranslation } from "react-i18next";

import { ReceiveDetailsRow, StyledReceiveDetailsParagraph } from "./styles";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import Icon, { IconKeys } from "../Icons/Icon";
import { IInlineStyles } from "../../../commonTypes";

type ReceiveDetailsProps = {
  iconKey: IconKeys;
  chainName: string;
  symbol: string;
  gasFees: string | number;
  serviceTime: number;
  transactionFees?: string;
  slippage?: string;
  amountOut: string;
};

const styles: IInlineStyles = {
  icon: { margin: "0 0 1.6rem 0" },
  chainName: {
    fontSize: theme.paragraph.xl,
    margin: `0rem 0 1.6rem ${theme.margin.sm}`,
  },
};

const ReceiveDetails = ({
  iconKey,
  chainName,
  gasFees,
  serviceTime,
  transactionFees,
  amountOut,
  symbol,
}: ReceiveDetailsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <ReceiveDetailsRow hasBottomBorder justifyContent={"flex-start"}>
        <Icon name={iconKey} size={"2.2rem"} style={styles.icon} />
        <StyledReceiveDetailsParagraph isWhite style={styles.chainName}>
          {chainName}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
      <ReceiveDetailsRow hasBottomBorder>
        <StyledReceiveDetailsParagraph>
          {t("gas-fees-time")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite noCapitalize>
          ~${gasFees} | ~{serviceTime} min
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
      <ReceiveDetailsRow>
        <StyledReceiveDetailsParagraph>
          {t("amount-out")}
        </StyledReceiveDetailsParagraph>
        <StyledReceiveDetailsParagraph isWhite>
          {amountOut} {symbol}
        </StyledReceiveDetailsParagraph>
      </ReceiveDetailsRow>
    </div>
  );
};
export default ReceiveDetails;
