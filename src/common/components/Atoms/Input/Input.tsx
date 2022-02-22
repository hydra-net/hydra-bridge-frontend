import React from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledInput } from "./styles";
import { FlexWrapper } from "../Wrappers/Wrapper";
import { InputLabel } from "../Label/Label";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  // let us pass an array of input attributes, eg: min, max, pattern, ...
  additionalAttributes?: Record<string, any>;
};

const handleInputWrapping = (
  Component: StyledComponent<"input", any>,
  {
    value,
    type = "text",
    label,
    placeholder,
    isDisabled,
    onChange,
    additionalAttributes,
    ...props
  }: InputProps
) => {
  return (
    <FlexWrapper alignItems={"start"}>
      {label && (
        <InputLabel fontWeight={theme.fontWeight.semibold}>{label}</InputLabel>
      )}
      <Component
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        {...additionalAttributes}
        {...props}
      />
    </FlexWrapper>
  );
};

export const Input = (props: InputProps & IStyleableProps) =>
  handleInputWrapping(StyledInput, props);
