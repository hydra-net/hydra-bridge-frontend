import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type StyledInputProps = {
  isLoading?: boolean;
  fontWeight?: number;
  fullWidth?: boolean;
  borderRadius?: string;
};

export const StyledInput = styled.input<StyledInputProps>`
  font-size: ${theme.paragraph.lg};
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue.dark};
  width: 100%;
  padding: ${theme.margin.md};
  border-width: 2px;
  border-style: solid;
  border-color: ${theme.colors.blue.lighter};
  border-radius: ${theme.borderRadius.lg};

  transition: border-color 300ms, color 300ms;

  &::placeholder {
    color: ${theme.colors.blue.lighter};
  }

  &:focus,
  :focus-visible,
  :focus-within {
    outline: none;
    border-color: ${theme.colors.blue.light};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${theme.colors.white};
  }
`;
