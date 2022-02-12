import styled, { css } from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type IStyledButtonProps = {
  isLoading?: boolean;
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

  opacity: ${(props) => (props.disabled && !props.isLoading ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* Hover: make a brighter effect on the button */
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

/* Hover: shows a reflect animation from left to right on the button */
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

  /* Focus: display an offset ring */
  &:focus {
    outline: none;
    box-shadow: ${theme.colors.white} 0 0 0 2px,
    ${theme.colors.blue.darkest} 0 0 0 4px,
    ${theme.colors.black} 0 0 0 0;
  }

  /* Loading: display a circle spinner and hide the text */
  ${(props) =>
    props.isLoading &&
    css`
      color: transparent;
      &:after {
        z-index: 50;
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        filter: contrast(300%);
        animation: button-loading-spinner 1s ease infinite;
      }
    `}

  /* icon */
  .btn-icon {
    display:flex;
    align-items:center;
    margin-bottom:auto;
    margin-top:auto;
    margin-left: 1rem;
  }
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background: transparent
    linear-gradient(
      90deg,
      ${theme.colors.blue.lightest} 0,
      ${theme.colors.blue.medium} 100%
    )
    0 0 no-repeat;

  &:focus {
    box-shadow: ${theme.colors.blue.darkest} 0 0 0 2px,
      ${theme.colors.blue.lightest} 0 0 0 4px, ${theme.colors.black} 0 0 0 0;
  }

  /* Keyframes: rotate the button loading circle */
  @keyframes button-loading-spinner {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(1turn);
    }
  }
`;
