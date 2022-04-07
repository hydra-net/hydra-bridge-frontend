import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

import { FlexWrapper } from "../Wrappers/Wrapper";
import { ContainerCard } from "../Containers/Container";
import { FakeButton } from "../Buttons/Button";
import {
  AccordionContent,
  AccordionIcon,
} from "../../Molecules/Accordion/styles";
import { IconKeys } from "../Icons/Icon";
import { StyledReceiveDetailsHeaderParagraph } from "./styles";
import ReceiveDetails from "./ReceiveDetails";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type ReceiveDetailsAccordionProps = {
  isLoading?: boolean;
  amountOut: string;
  gasFees: number;
  serviceTime: number;
  chainName: string;
  iconKey: IconKeys;
  transactionFees?: string;
  slippage?: string;
};

const ReceiveDetailsAccordion = ({
  // isLoading,
  amountOut,
  gasFees,
  serviceTime,
  chainName,
  iconKey,
  transactionFees,
}: ReceiveDetailsAccordionProps) => {
  const [height, setHeight] = useState<string | number>(0);

  const handleToggle = () => {
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <ContainerCard hasHoverEffect={true} padding={"0"}>
      <FakeButton
        ariaLabel={"open accordion"}
        aria-expanded={height !== 0}
        onClick={handleToggle}
      >
        <div
          style={{
            padding: `1rem 1.6rem`,
            borderBottom: `1px solid ${
              height ? theme.colors.blue["medium-darker"] : "transparent"
            }`,
            transition: "border 300ms linear",
          }}
        >
          <FlexWrapper flexDirection={"row"} style={{ pointerEvents: "none" }}>
            <StyledReceiveDetailsHeaderParagraph isEmpty={!amountOut}>
              {amountOut ? amountOut : "0.0"}
            </StyledReceiveDetailsHeaderParagraph>
            <AccordionIcon
              name={"cutArrowDown"}
              width={"2.4rem"}
              height={"2.4rem"}
              style={{ marginLeft: "1.7rem" }}
              isopen={height !== 0 ? 1 : 0}
            />
          </FlexWrapper>
        </div>
      </FakeButton>
      <AnimateHeight height={height} duration={500} style={{ width: "100%" }}>
        <AccordionContent padding={"1.6rem"}>
          <ReceiveDetails
            iconKey={iconKey}
            chainName={chainName}
            gasFees={gasFees}
            serviceTime={serviceTime}
            amountOut={amountOut}
            transactionFees={transactionFees}
          />
        </AccordionContent>
      </AnimateHeight>
    </ContainerCard>
  );
};

export default ReceiveDetailsAccordion;
