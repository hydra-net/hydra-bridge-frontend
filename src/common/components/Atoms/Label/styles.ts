import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type StyledLabel = {
  color?: boolean;
  margin?: number;
};

// TODO set smaller for mobile
export const StyledInputLabel = styled.label<StyledLabel>`
  font-size: ${theme.paragraph.lg};
  color: ${(props) => (props.color ? props.color : theme.colors.black)};
  margin: ${(props) =>
    props.margin ? props.margin : `0 0 ${theme.margin.sm} 0`};
`;
