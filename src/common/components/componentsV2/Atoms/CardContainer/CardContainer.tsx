import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { stakenetTheme as theme } from "../../../../../shell/theme/stakenetTheme";
import { hex2rgba } from "../../../../../helpers/styleHelper";

type CardContainerProps = {
  children?: ReactNode;
  bg?: string;
  borderRadius?: string;
  maxWidth?: string;
  spacing?: "sm" | "lg";
  border?: string;
};

const StyledCardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${(props) =>
    props.maxWidth ? props.maxWidth : theme.maxWidth.full};
  background-color: ${(props) =>
    props.bg ? props.bg : hex2rgba(theme.colors.blue.darker, 0.6)};
  border-width: ${(props) => (props.border ? props.border : 0)};
  border-color: transparent;
  border-style: solid;
  padding: ${(props) => (props.spacing === "sm" ? "1.6rem" : "2.4rem")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : theme.borderRadius.xxl};

  ${(props) =>
    props.maxWidth &&
    css`
      margin: auto;
    `}
`;

export const CardContainer = (props: CardContainerProps) => (
  <StyledCardContainer {...props}>{props.children}</StyledCardContainer>
);
