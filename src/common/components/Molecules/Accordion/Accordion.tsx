import React, { ReactNode, useState } from "react";
import AnimateHeight from "react-animate-height";

import { AccordionContent, AccordionIcon } from "./styles";
import { ContainerCard } from "../../Atoms/Containers/Container";
import { FakeButton } from "../../Atoms/Buttons/Button";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import { IInlineStyles } from "../../../commonTypes";

const styles: IInlineStyles = {
  flexWrapper: { pointerEvents: "none" },
  accordionIcon: { marginLeft: "1.7rem" },
  animateHeight: { width: "100%" },
};

export type AccordionProps = {
  header: ReactNode;
  content: ReactNode;
};

const Accordion = ({ header, content }: AccordionProps) => {
  const [height, setHeight] = useState<string | number>(0);

  const handleToggle = () => {
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <ContainerCard hasHoverEffect={true}>
      <FakeButton
        ariaLabel={"open accordion"}
        aria-expanded={height !== 0}
        onClick={handleToggle}
      >
        <FlexWrapper flexDirection={"row"} style={styles.flexWrapper}>
          {header}
          <AccordionIcon
            name={"cutArrowDown"}
            width={"2.4rem"}
            height={"2.4rem"}
            style={styles.accordionIcon}
            isopen={height !== 0 ? 1 : 0}
          />
        </FlexWrapper>
      </FakeButton>
      <AnimateHeight
        height={height}
        duration={500}
        style={styles.animateHeight}
      >
        <AccordionContent>{content}</AccordionContent>
      </AnimateHeight>
    </ContainerCard>
  );
};

export default Accordion;
