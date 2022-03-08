import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";

export type StyledLabel = {
  color?: boolean;
  margin?: number;
  fontWeight?: number;
};

export const StyledInputLabel = styled.label<StyledLabel>`
  font-size: ${theme.paragraph.md};
  color: ${(props) => (props.color ? props.color : theme.colors.white)};
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : theme.fontWeight.semibold};
  margin: ${(props) =>
    props.margin ? props.margin : `0 0 ${theme.margin.md} 0`};

  @media only screen and ${devicesUp.lg} {
    font-size: ${theme.paragraph.lg};
  }
`;
