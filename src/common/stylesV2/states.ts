import { css } from "styled-components";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";

export const isDisabled = css`
  cursor: not-allowed;
  color: ${theme.colors.gray["medium-dark"]};
  border-color: ${theme.colors.gray["medium-dark"]};
`;

export const getHasError = css`
  color: ${theme.colors.red};
  border-color: ${theme.colors.red};
`;
