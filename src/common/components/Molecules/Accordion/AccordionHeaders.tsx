import { useTranslation } from "react-i18next";

import {
  StyledAccordionHeader,
  AccordionIcon,
  StyledReceiveDetailsAccordionHeader,
  StyledAccordionReceiveDetailsGasFeeEstimation,
  StyledAccordionReceiveDetailsAmountOut,
} from "./styles";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import React, { ReactNode } from "react";
import Icon from "../../Icon/Icon";
import { formatGasFees } from "../../../../helpers/formatsHelper";

export type AccordionHeaderProps = {
  children: ReactNode;
  isOpen?: boolean;
};
export const AccordionHeader = ({ isOpen, children }: AccordionHeaderProps) => {
  return (
    <StyledAccordionHeader>
      <FlexWrapper flexDirection={"row"}>
        {children}
        {/* TODO 44 integrate font awesome in next PR and replace */}
        <AccordionIcon
          name={"cutArrowDown"}
          width={"2.4rem"}
          height={"2.4rem"}
          style={{ marginLeft: "1.7rem" }}
          isopen={isOpen ? 1 : 0}
        />
      </FlexWrapper>
    </StyledAccordionHeader>
  );
};

type ReceiveDetailsAccordionHeaderProps = {
  isOpen?: boolean;
  amountOut?: string;
  inProgress?: boolean;
  isDisabled?: boolean;
  transactionCoastUsd?: number;
};
export const ReceiveDetailsAccordionHeader = ({
  isOpen,
  amountOut,
  inProgress,
  transactionCoastUsd,
}: ReceiveDetailsAccordionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <StyledReceiveDetailsAccordionHeader isOpen={isOpen}>
      <FlexWrapper flexDirection={"row"} style={{ padding: "1.1rem 1.6rem" }}>
        <FlexWrapper
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <StyledAccordionReceiveDetailsAmountOut>
            {amountOut ? (
              amountOut
            ) : inProgress ? (
              <span>{t("fetching-prices")}...</span>
            ) : (
              "0.0"
            )}
          </StyledAccordionReceiveDetailsAmountOut>
          <FlexWrapper
            flexDirection={"row"}
            justifyContent={"flex-end"}
            inlineFlex
          >
            {/* TODO loading spinner integration in next PR */}
            {!amountOut ? null : inProgress ? (
              ""
            ) : (
              <>
                {/* TODO 44 integrate font awesome in next PR and replace */}
                <Icon name={"copy"} size={"1.6rem"} />
                <StyledAccordionReceiveDetailsGasFeeEstimation>
                  ~${formatGasFees(transactionCoastUsd)}
                </StyledAccordionReceiveDetailsGasFeeEstimation>
              </>
            )}
          </FlexWrapper>
        </FlexWrapper>

        {/* TODO 44 integrate font awesome in next PR and replace */}
        <AccordionIcon
          name={"cutArrowDown"}
          width={"2.4rem"}
          height={"2.4rem"}
          style={{ marginLeft: "1.7rem" }}
          isopen={isOpen ? 1 : 0}
        />
      </FlexWrapper>
    </StyledReceiveDetailsAccordionHeader>
  );
};
