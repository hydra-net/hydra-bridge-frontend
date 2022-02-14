import styled, { css } from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type IStyledButtonProps = {
  fontWeight?: number;
  fullWidth?: boolean;
  borderRadius?: string;
};

export const StyledButton = styled.button<IStyledButtonProps>`
  position: relative;
  z-index: 1;
  overflow: hidden;
  font-size: ${theme.paragraph.md};
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : theme.fontWeight.normal};
  color: ${theme.colors.white};
  background: ${theme.colors.gray["medium-dark"]};
  ${(props) =>
    props.fullWidth
      ? css`
          width: 100%;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          align-items: center;
        `
      : css`
          width: auto;
          display: inline-flex;
          flex: none;
        `};
  border: 1px transparent;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : theme.borderRadius.lg};
  padding: 1.5rem;

  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

/**
  Transitions hover
 */
/* only show brightness transition if button full width and is not disabled */
  ${(props) =>
    props.fullWidth && !props.disabled
      ? css`
          &:hover {
            filter: brightness(120%);
            -webkit-transition: -webkit-filter 200ms ease-in-out;
          }
        `
      : ""};
  }
/* only show white shades animation if button is not full width and is not disabled */
  ${(props) =>
    !props.fullWidth && !props.disabled
      ? css`
          &:after {
            background: ${theme.colors.white};
            content: "";
            height: 155px;
            left: -75px;
            opacity: 0.2;
            position: absolute;
            top: -50px;
            transform: rotate(35deg);
            transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
            width: 50px;
            z-index: -10;
          }
          &:hover {
            &:after {
              left: 120%;
              transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
            }
          }
        `
      : ""}
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background: transparent
    linear-gradient(
      90deg,
      ${theme.colors.blue.lightest} 0,
      ${theme.colors.blue.medium} 100%
    )
    0 0 no-repeat;
`;
