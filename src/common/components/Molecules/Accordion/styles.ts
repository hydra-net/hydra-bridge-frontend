import styled from "styled-components";

import Icon from "../../Icon/Icon";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const AccordionContainer = styled.div`
  display: flex;
  tab-index: 0;
  flex-direction: column;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 10px;
  height: auto;
  padding: 2%;
  width: 100%;
  text-align: center;
`;
export const AccordionContent = styled.div`
  width: 100%;
  padding-top: ${theme.margin.lg};
`;

export const AccordionIcon = styled(Icon)<{ isopen: boolean }>`
  transform: ${(props) => (props.isopen ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 0.3s linear;
`;
