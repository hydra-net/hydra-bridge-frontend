import styled from "styled-components";

import Icon from "../../Atoms/Icons/Icon";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const AccordionContent = styled.div<{ padding?: string }>`
  width: 100%;
  padding: ${(props) =>
    props.padding ? props.padding : `${theme.margin.lg} 0 0 0`};
`;

export const AccordionIcon = styled(Icon)<{ isopen: boolean }>`
  transform: ${(props) => (props.isopen ? "rotate(0)" : "rotate(-90deg)")};
  transition: transform 0.3s linear;
`;
