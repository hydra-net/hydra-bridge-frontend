import { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import {
  IStyledButtonProps,
  StyledButton,
  StyledPrimaryButton,
} from "./styles";
import { IconKeys } from "../../../commonTypes";
import Icon from "../../Icon/Icon";

type ButtonProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e?: any) => void;
  children?: ReactNode;
  iconName?: IconKeys;
  iconSize?: string;
};

const handleButtonWrapping = (
  Component: StyledComponent<"button", any>,
  { isDisabled, onClick, children, ...props }: ButtonProps & IStyledButtonProps
) => (
  <Component
    onClick={onClick}
    disabled={isDisabled || props.isLoading}
    {...props}
  >
    {children}
    {props.iconName && (
      <span className="btn-icon">
        <Icon name={props.iconName} size={props.iconSize || "1.4rem"} />
      </span>
    )}
  </Component>
);

export const Button = (props: ButtonProps & IStyledButtonProps) =>
  handleButtonWrapping(StyledButton, props);

export const PrimaryButton = (props: ButtonProps & IStyledButtonProps) =>
  handleButtonWrapping(StyledPrimaryButton, props);
