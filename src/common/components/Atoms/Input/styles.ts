import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { getHasError } from "../../../styles";

export type StyledInputProps = {
  isLoading?: boolean;
  fontWeight?: number;
  fullWidth?: boolean;
  borderRadius?: string;
};

export const StyledInput = styled.input<StyledInputProps>`
  font-size: ${theme.paragraph.xl};
  color: ${theme.colors.blue.lighter};
  background-color: ${theme.colors.blue.dark};
  width: 100%;
  padding: 1.4rem;
  border-width: 2px;
  border-style: solid;
  border-color: ${theme.colors.gray["medium-dark"]};
  border-radius: ${theme.borderRadius.lg};

  transition: border-color 300ms, color 300ms;

  &::placeholder {
    color: ${theme.colors.gray["medium-dark"]};
  }

  &:focus,
  :focus-visible,
  :focus-within {
    outline: none;
    color: ${theme.colors.white};
    border-color: ${theme.colors.blue.light};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${theme.colors.gray["medium-dark"]};
  }

  &.has-error {
    ${getHasError};
    &::placeholder {
      ${getHasError};
    }
  }
`;
