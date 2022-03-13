import {
  StyledAccordionHeader,
  AccordionIcon,
  StyledReceiveDetailsAccordionHeader,
} from "./styles";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import React, { ReactNode } from "react";

type AccordionHeaderProps = {
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

type AccordionHeaderWithBorderSeparatorProps = {
  isOpen?: boolean;
  children: ReactNode;
};
export const ReceiveDetailsAccordionHeader = ({
  isOpen,
  children,
}: AccordionHeaderWithBorderSeparatorProps) => {
  return (
    <StyledReceiveDetailsAccordionHeader isOpen={isOpen}>
      <FlexWrapper flexDirection={"row"} style={{ padding: "1.1rem 1.6rem" }}>
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
    </StyledReceiveDetailsAccordionHeader>
  );
};
