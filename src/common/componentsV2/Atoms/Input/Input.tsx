import React from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledInput } from "./styles";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  step?: number;
  type?: string;
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
    placeholder,
    isDisabled,
    onChange,
    additionalAttributes,
    ...props
  }: InputProps
) => {
  return (
    <Component
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={onChange}
      {...additionalAttributes}
      {...props}
    />
  );
};

export const Input = (props: InputProps & IStyleableProps) =>
  handleInputWrapping(StyledInput, props);
