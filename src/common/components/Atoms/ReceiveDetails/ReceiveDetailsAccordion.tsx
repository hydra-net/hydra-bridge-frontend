import React, { useMemo, useState } from "react";
import AnimateHeight from "react-animate-height";

import { FlexWrapper } from "../Wrappers/Wrapper";
import { ContainerCard } from "../Containers/Container";
import { FakeButton } from "../Buttons/Button";
import {
  AccordionContent,
  AccordionIcon,
} from "../../Molecules/Accordion/styles";
import ReceiveDetails from "./ReceiveDetails";
import LoadingSpinner from "../../LoadingSpinner";

import { IconKeys } from "../Icons/Icon";
import { StyledReceiveDetailsHeaderParagraph } from "./styles";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type ReceiveDetailsAccordionProps = {
  isLoading?: boolean;
  amountOut?: string;
  gasFees?: string | number;
  serviceTime?: number;
  chainName?: string;
  symbol?: string;
  iconKey?: IconKeys;
  transactionFees?: string;
  slippage?: string;
};

const ReceiveDetailsAccordion = ({
  isLoading,
  amountOut,
  gasFees,
  serviceTime,
  chainName,
  iconKey,
  symbol,
  transactionFees,
}: ReceiveDetailsAccordionProps) => {
  const [height, setHeight] = useState<string | number>(0);

  /**
   * Memo styles to avoid useless re-renders with inline styles
   */
  const memoStylesAccordionHeader = useMemo(
    () => ({
      padding: `1rem 1.6rem`,
      borderBottom: `1px solid ${
        hasRouteSelected() && height
          ? theme.colors.blue["medium-darker"]
          : "transparent"
      }`,
      transition: "border 300ms linear",
    }),
    []
  );
  const memoStylesFlexWrapper = useMemo(() => ({ pointerEvents: "none" }), []);
  const memoStylesLoader = useMemo(
    () => ({
      width: "2.4rem",
      height: "1.1rem",
      color: "white",
      marginBottom: "auto",
    }),
    []
  );
  const memoStylesAccordionIcon = useMemo(() => ({ marginLeft: "1.7rem" }), []);
  const memoStylesPlaceholder = useMemo(
    () => ({ width: "2.4rem", height: "1.1rem" }),
    []
  );
  const memoStylesAnimateHeight = useMemo(() => ({ width: "100%" }), []);
  /**
   * Getter, depending the value returned, it will allow to toggle the accordion / display the content of it
   */
  function hasRouteSelected(): boolean {
    return !!chainName && !!amountOut && !!gasFees && !!iconKey;
  }

  const handleToggle = (): void => {
    if (hasRouteSelected()) {
      setHeight(height === 0 ? "auto" : 0);
    }
  };
  return (
    <ContainerCard
      hasHoverEffect={true}
      padding={"0"}
      border={"2px"}
      bg={theme.colors.blue.dark}
      borderRadius={theme.borderRadius.lg}
      borderColor={theme.colors.blue["medium-darker"]}
    >
      <FakeButton
        ariaLabel={"open accordion"}
        disabled={!hasRouteSelected()}
        aria-expanded={amountOut && height !== 0}
        onClick={handleToggle}
      >
        <div style={memoStylesAccordionHeader}>
          <FlexWrapper flexDirection={"row"} style={memoStylesFlexWrapper}>
            <StyledReceiveDetailsHeaderParagraph isEmpty={!amountOut}>
              {amountOut ? amountOut : "0.0"}
            </StyledReceiveDetailsHeaderParagraph>
            {isLoading ? (
              // placeholder
              <span style={memoStylesLoader}>
                <LoadingSpinner size={"1.8rem"} />
              </span>
            ) : hasRouteSelected() ? (
              <AccordionIcon
                name={"cutArrowDown"}
                width={"1.8rem"}
                height={"1.8rem"}
                style={memoStylesAccordionIcon}
                isopen={height !== 0 ? 1 : 0}
              />
            ) : (
              // placeholder
              <span style={memoStylesPlaceholder} />
            )}
          </FlexWrapper>
        </div>
      </FakeButton>
      {hasRouteSelected() && (
        <AnimateHeight
          height={height}
          duration={500}
          style={memoStylesAnimateHeight}
        >
          <AccordionContent padding={"1.6rem"}>
            <ReceiveDetails
              iconKey={iconKey!}
              symbol={symbol!}
              chainName={chainName!}
              gasFees={gasFees!}
              serviceTime={serviceTime!}
              amountOut={amountOut || ""}
              transactionFees={transactionFees || "0"}
            />
          </AccordionContent>
        </AnimateHeight>
      )}
    </ContainerCard>
  );
};

export default ReceiveDetailsAccordion;
