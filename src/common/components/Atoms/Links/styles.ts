import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type StyledLinkProps = {
  size?: string;
  color?: string;
  hoverColor?: string;
};

export const StyledLink = styled.a<StyledLinkProps>`
  font-size: ${(props) => (props.size ? props.size : theme.paragraph.md)};
  color: ${(props) => (props.color ? props.color : theme.colors.blue.light)};
  text-decoration: none;

  &:hover {
    color: ${(props) =>
      props.hoverColor ? props.hoverColor : theme.colors.blue.lighter};
  }
`;
