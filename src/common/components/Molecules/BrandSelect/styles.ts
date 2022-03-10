import styled from "styled-components";
import Select, { StylesConfig } from "react-select";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { hex2rgba } from "../../../../helpers/styleHelper";
import { SelectOptionType } from "./SelectOption";

export const StyledSelect = styled(Select)`
  width: 100%;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.paragraph.xl};
`;

const themeDarkerBlue = theme.colors.blue.darker;
const themeDarkestBlue = theme.colors.blue.darkest;
const themeLightBlue = theme.colors.blue.light;
const noValueSelectedColor = hex2rgba(theme.colors.white, 0.3);
export const colourStylesOverride: StylesConfig<SelectOptionType> = {
  control: (styles) => ({
    ...styles,
    padding: ".5rem .4rem",
    borderWidth: "2px",
    borderRadius: theme.borderRadius.lg,
    backgroundColor: themeDarkestBlue,
    borderColor: "transparent",
    ":hover": {
      borderColor: "transparent",
    },
    ":focus, :focus-within, :active": {
      outline: "none",
      borderColor: themeLightBlue,
      boxShadow: "none",
    },
  }),
  indicatorSeparator: (styles, { isFocused, hasValue }) => ({
    ...styles,
    backgroundColor: !isFocused
      ? hasValue
        ? theme.colors.white
        : noValueSelectedColor
      : themeLightBlue,
  }),
  dropdownIndicator: (styles, { hasValue, isFocused }) => ({
    ...styles,
    color: !isFocused
      ? hasValue
        ? theme.colors.white
        : noValueSelectedColor
      : themeLightBlue,
    ":hover": {
      color: !isFocused
        ? hasValue
          ? theme.colors.white
          : noValueSelectedColor
        : themeLightBlue,
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? hex2rgba(themeDarkerBlue, 0.7)
        : isSelected
        ? hex2rgba(themeDarkerBlue, 0.9)
        : isFocused
        ? hex2rgba(themeDarkestBlue, 0.9)
        : themeDarkestBlue,
      color: isDisabled
        ? hex2rgba(theme.colors.white, 0.6)
        : theme.colors.white,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? hex2rgba(themeDarkerBlue, 0.9)
          : undefined,
      },
    };
  },
  noOptionsMessage: (styles) => ({
    ...styles,
    color: noValueSelectedColor,
    backgroundColor: themeDarkestBlue,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: themeLightBlue,
    borderRadius: theme.borderRadius.md,
  }),
  menu: (styles) => ({ ...styles, borderRadius: theme.borderRadius.md }),
  menuList: () => ({
    backgroundColor: "transparent",
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.boxShadow.xxl,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  placeholder: (styles) => ({
    ...styles,
    color: noValueSelectedColor,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
};
