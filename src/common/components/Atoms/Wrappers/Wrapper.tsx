import { StyledComponent } from "styled-components";
import React, { ReactNode } from "react";
import { StyledFlexWrapper, StyledFlexWrapperProps } from "./styles";

type WrapperProps = {
  children: ReactNode;
};

const handleWrapperWrapping = (
  Component: StyledComponent<"div", any>,
  props: WrapperProps & StyledFlexWrapperProps
) => {
  return <Component {...props}>{props.children}</Component>;
};

export const FlexWrapper = (props: WrapperProps & StyledFlexWrapperProps) =>
  handleWrapperWrapping(StyledFlexWrapper, props);
