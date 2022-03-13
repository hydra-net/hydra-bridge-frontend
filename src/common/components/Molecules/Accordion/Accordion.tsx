import React, { ReactNode, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

import { ContainerCard } from "../../Atoms/Containers/Container";
import { FakeButton } from "../../Atoms/Buttons/Button";
import { IStyleableProps } from "../../../commonTypes";
export type AccordionProps = {
  header: ReactNode;
  content: ReactNode;
  bg?: string;
  isOpenFromParent?: boolean;
  bottomBorderColorHeader?: string;
  onToggle?: () => void;
};

const Accordion = ({
  header,
  content,
  bg,
  isOpenFromParent,
  onToggle,
}: AccordionProps & IStyleableProps) => {
  const [height, setHeight] = useState<string | number>(0);

  // allow to trigger an open from parent
  useEffect(() => {
    setHeight(isOpenFromParent ? "auto" : 0);
  }, [isOpenFromParent]);

  const isOpen = (): boolean => height !== 0;

  /**
   * Handler that emit the fact the click on toggle was done if
   * the process open/close process is handled by the parent
   * Otherwise update the internal state
   */
  const handleToggle = (): void => {
    if (onToggle) {
      onToggle();
    } else {
      setHeight(isOpen() ? 0 : "auto");
    }
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
