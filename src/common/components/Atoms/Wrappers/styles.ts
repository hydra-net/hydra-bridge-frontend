import styled, { css } from "styled-components";

export type StyledFlexWrapperProps = {
  inlineFlex?: boolean;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flex?: string;
  margin?: string;
};

export const StyledFlexWrapper = styled.div<StyledFlexWrapperProps>`
  width: 100%;
  display: ${(props) => (props.inlineFlex ? "inline-flex" : "flex")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;
