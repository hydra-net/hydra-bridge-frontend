import { IStyleableProps } from "../../../commonTypes";
import { useTranslation } from "react-i18next";
import { colourStylesOverride, StyledSelect } from "./styles";
import SelectOption, { SelectOptionType } from "./SelectOption";
import SelectValue, { SelectValueType } from "./SelectValue";

type SelectProps = {
  value?: SelectValueType;
  options: Array<SelectOptionType>;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  noOptionsMessage?: string;
  onChange: (option: any) => void;
};
const BrandSelect = ({
  value,
  options,
  placeholder,
  isLoading,
  isDisabled,
  onChange,
  noOptionsMessage,
}: SelectProps & IStyleableProps) => {
  const { t } = useTranslation();
  const noOptionsText = noOptionsMessage || t("common.no-options-in-select");

  return (
    <>
      <StyledSelect
        // @ts-ignore
        styles={colourStylesOverride}
        value={value}
        options={options}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        onChange={onChange}
        components={{ Option: SelectOption, SingleValue: SelectValue }}
        isDisabled={isLoading || isDisabled}
      />
    </>
  );
};

export default BrandSelect;
