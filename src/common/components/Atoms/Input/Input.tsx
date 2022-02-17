import React from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledInput } from "./styles";
import { FlexWrapper } from "../Wrappers/Wrapper";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  step?: number;
  type?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasError?: boolean;
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
    hasError,
    additionalAttributes,
    ...props
  }: InputProps
) => {
  return (
    <FlexWrapper alignItems={"start"}>
      {label && <p>{label}</p>}
      <Component
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        className={hasError ? "has-error" : ""}
        {...additionalAttributes}
        {...props}
      />
    </FlexWrapper>
  );
};

export const Input = (props: InputProps & IStyleableProps) =>
  handleInputWrapping(StyledInput, props);
