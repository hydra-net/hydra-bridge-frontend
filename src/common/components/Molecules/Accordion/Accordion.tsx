import React, { ReactNode, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

import { ContainerCard } from "../../Atoms/Containers/Container";
import { FakeButton } from "../../Atoms/Buttons/Button";
import { IStyleableProps } from "../../../commonTypes";
export type AccordionProps = {
  header: ReactNode;
  content: ReactNode;
  bg?: string;
  shouldTriggerToggle?: boolean;
  bottomBorderColorHeader?: string;
};

const Accordion = ({
  header,
  content,
  bg,
  shouldTriggerToggle,
}: AccordionProps & IStyleableProps) => {
  const [height, setHeight] = useState<string | number>(0);

  // allow to trigger an open from parent
  useEffect(() => {
    if (shouldTriggerToggle) setHeight(isOpen() ? 0 : "auto");
  }, [shouldTriggerToggle]);

  const isOpen = (): boolean => height !== 0;

  const handleToggle = (): void => {
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <ContainerCard padding={"0"} bg={bg} style={{ width: "100%" }}>
      <FakeButton
        ariaLabel={"open accordion"}
        aria-expanded={isOpen()}
        onClick={handleToggle}
      >
        {header}
      </FakeButton>
      <AnimateHeight height={height} duration={500} style={{ width: "100%" }}>
        {content}
      </AnimateHeight>
    </ContainerCard>
  );
};

export default Accordion;
