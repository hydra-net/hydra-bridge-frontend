import styled, { css } from "styled-components";

export type StyledFlexWrapperProps = {
  inlineFlex?: boolean;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flex?: string;
};

export const StyledFlexWrapper = styled.div<StyledFlexWrapperProps>`
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
`;
