import { AccordionContent } from "./styles";
import { ReactNode, useState } from "react";
import AnimateHeight from "react-animate-height";
import { ContainerCard } from "../../Atoms/Containers/Container";
import { UnStyledButton } from "../../Atoms/Buttons/styles";
export type AccordionProps = {
  header: ReactNode;
  content: ReactNode;
};

const Accordion = ({ header, content }: AccordionProps) => {
  const [height, setHeight] = useState<string | number>(0);

  const handleOpen = () => {
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <UnStyledButton onClick={handleOpen}>
      <ContainerCard padding={"1.8rem"}>
        {header}
        <AnimateHeight height={height}>
          <AccordionContent>{content}</AccordionContent>
        </AnimateHeight>
      </ContainerCard>
    </UnStyledButton>
  );
};

export default Accordion;
