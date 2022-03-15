import React, { ReactNode, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

import { ContainerCard } from "../../Atoms/Containers/Container";
import { FakeButton } from "../../Atoms/Buttons/Button";
import { IStyleableProps } from "../../../commonTypes";
export type AccordionProps = {
  header: ReactNode;
  content: ReactNode;
  bg?: string;
  isOpenFromParent?: boolean | undefined;
  bottomBorderColorHeader?: string;
  onToggle?: (newStatus: boolean) => void | undefined;
};

const Accordion = ({
  header,
  content,
  bg,
  isOpenFromParent = undefined,
  onToggle = undefined,
}: AccordionProps & IStyleableProps) => {
  const [height, setHeight] = useState<string | number>(0);

  // allow to trigger an open from parent
  useEffect(() => {
    setHeight(isOpenFromParent ? "auto" : 0);
  }, [isOpenFromParent]);

  const isOpen = (): boolean => height !== 0;

  /**
   * Handler that emit the click on if onToggle is function is defined to let parent know
   * the trigger was made
   * Open itself if the isFromParent props was given by the parent and the state is handled there
   * If the isFromParent props is not passed the Accordion will manage it's state alone
   * However the Icon won't receive the change status if the onToggle function is
   * not listened by the parent (who has the child header)
   */
  const handleToggle = (): void => {
    if (onToggle) {
      onToggle(!isOpen());
    }
    if (isOpenFromParent === undefined) {
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
