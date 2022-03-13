import styled from "styled-components";

import Icon from "../../Icon/Icon";

import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import { defaultContainerCardPadding } from "../../Atoms/Containers/styles";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

const defaultAccordionPadding = `1.8rem ${defaultContainerCardPadding}`;

export const StyledAccordionHeader = styled(FlexWrapper)`
  flex-direction: row;
  padding: ${defaultAccordionPadding};
  pointer-events: none;
`;

export const AccordionContent = styled.div<{ padding?: string }>`
  width: 100%;
  padding: ${(props) =>
    props.padding
      ? props.padding
      : `0 ${defaultContainerCardPadding} 1.8rem ${defaultContainerCardPadding}`};
`;

export const AccordionIcon = styled(Icon)<{ isopen: boolean }>`
  transform: ${(props) => (props.isopen ? "rotate(0)" : "rotate(-90deg)")};
  transition: transform 0.3s linear;
`;

export const StyledReceiveDetailsAccordionHeader = styled(
  StyledAccordionHeader
)<{
  isOpen?: boolean;
}>`
  padding: 0;
  border-bottom: 1px solid;
  border-color: ${(props) =>
    props.isOpen ? theme.colors.blue["medium-darker"] : "transparent"};
  transition: border-bottom-color 150ms linear;
`;
