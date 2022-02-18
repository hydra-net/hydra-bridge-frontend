import { StyledComponent } from "styled-components";
import React, { ReactNode } from "react";
import { StyledFlexWrapper, StyledFlexWrapperProps } from "./styles";
import { IStyleableProps } from "../../../commonTypes";

type WrapperProps = {
  children: ReactNode;
};

const handleWrapperWrapping = (
  Component: StyledComponent<"div", any>,
  props: WrapperProps & StyledFlexWrapperProps & IStyleableProps
) => {
  return <Component {...props}>{props.children}</Component>;
};

export const FlexWrapper = (
  props: WrapperProps & StyledFlexWrapperProps & IStyleableProps
) => handleWrapperWrapping(StyledFlexWrapper, props);
