import { css } from "styled-components";

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

export const getAbsoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;