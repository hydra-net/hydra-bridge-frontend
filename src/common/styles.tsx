import { css } from "styled-components";
import { stakenetTheme as theme } from "../shell/theme/stakenetTheme";
/*****
 * Gaps
 */

export const getHorizontalGap = (size: string) => css`
  & > *:not(:last-child) {
    margin-right: ${size};
  }
`;

export const getVerticalGap = (size: string) => css`
  & > *:not(:last-child) {
    margin-bottom: ${size};
  }
`;

/**
 * Positions
 */

export const getFlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const getFlexStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const getFlexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const getAbsoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

/**
 * States
 */

export const isDisabled = css`
  cursor: not-allowed;
  color: ${theme.colors.gray["medium-dark"]};
  border-color: ${theme.colors.gray["medium-dark"]};
`;

export const getHasError = css`
  color: ${theme.colors.red};
  border-color: ${theme.colors.red};
`;
