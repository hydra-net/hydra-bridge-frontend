import React, { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledInputLabel } from "./styles";

type LabelProps = {
  children: ReactNode;
  for?: string;
  color?: string;
  margin?: string;
  fontWeight?: number;
};

const handleLabelWrapping = (
  Component: StyledComponent<"label", any>,
  props: LabelProps & IStyleableProps
) => {
  return <Component {...props}>{props.children}</Component>;
};

export const InputLabel = (props: LabelProps & IStyleableProps) =>
  handleLabelWrapping(StyledInputLabel, props);
