import React from "react";
import { useTranslation } from "react-i18next";

import SelectOption, { SelectOptionType } from "./SelectOption";
import SelectValue, { SelectValueType } from "./SelectValue";
import { InputLabel } from "../../Atoms/Label/Label";
import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";

import { IStyleableProps } from "../../../commonTypes";
import { colourStylesOverride, StyledSelect } from "./styles";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type SelectProps = {
  value?: SelectValueType;
  options: Array<SelectOptionType>;
  label?: string;
  errorText?: string;
  placeholder?: string;
  isLoading?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
  noOptionsMessage?: string;
  onChange: (option: any) => void;
};
const BrandSelect = ({
  value,
  options,
  label,
  errorText,
  placeholder,
  isLoading,
  hasError,
  isDisabled,
  onChange,
  noOptionsMessage,
}: SelectProps & IStyleableProps) => {
  const { t } = useTranslation();
  const noOptionsText = noOptionsMessage || t("common.no-options-in-select");

  return (
    <FlexWrapper alignItems={"start"}>
      {label && (
        <InputLabel fontWeight={theme.fontWeight.semibold}>{label}</InputLabel>
      )}
      <StyledSelect
        // @ts-ignore style config
        styles={colourStylesOverride}
        value={value}
        options={options}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        onChange={onChange}
        components={{ Option: SelectOption, SingleValue: SelectValue }}
        isDisabled={isLoading || isDisabled}
        className={hasError ? "has-error" : ""}
      />
      {errorText && (
        <p style={{ color: theme.colors.red, fontSize: theme.paragraph.xs }}>
          {errorText}
        </p>
      )}
    </FlexWrapper>
  );
};

export default BrandSelect;
