import React, { ReactNode, useState } from "react";
import AnimateHeight from "react-animate-height";

import { AccordionContent, AccordionIcon } from "./styles";
import { ContainerCard } from "../../Atoms/Containers/Container";
import { FakeButton } from "../../Atoms/Buttons/Button";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";

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
    <ContainerCard padding={"0"}>
      <FakeButton
        ariaLabel={"open accordion"}
        aria-expanded={height !== 0}
        style={{ padding: "1.8rem 2.4rem" }}
        onClick={handleToggle}
      >
        <FlexWrapper flexDirection={"row"} style={{ pointerEvents: "none" }}>
          {header}
          <AccordionIcon
            name={"cutArrowRight"}
            width={"1.7rem"}
            height={"1.7rem"}
            style={{ marginLeft: "1.7rem" }}
            isopen={height !== 0 ? 1 : 0}
          />
        </FlexWrapper>
      </FakeButton>
      <AnimateHeight height={height} duration={500} style={{ width: "100%" }}>
        <AccordionContent>{content}</AccordionContent>
      </AnimateHeight>
    </ContainerCard>
  );
};

export default Accordion;
