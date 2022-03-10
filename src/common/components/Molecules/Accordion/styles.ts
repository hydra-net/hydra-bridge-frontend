import styled from "styled-components";

import Icon from "../../Icon/Icon";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const AccordionContent = styled.div`
  width: 100%;
  padding-top: ${theme.margin.lg};
`;

export const AccordionIcon = styled(Icon)<{ isopen: boolean }>`
  transform: ${(props) => (props.isopen ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 0.3s linear;
`;
