import { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import {
  IStyledButtonProps,
  StyledButton,
  StyledPrimaryButton,
} from "./styles";

type ButtonProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e?: any) => void;
  children?: ReactNode;
};

const handleLinkWrapping = (
  Component: StyledComponent<"button", any>,
  {
    isLoading,
    isDisabled,
    onClick,
    children,
    ...props
  }: ButtonProps & IStyledButtonProps
) => (
  <Component onClick={onClick} disabled={isDisabled || isLoading} {...props}>
    {children}
  </Component>
);

export const Button = (props: ButtonProps & IStyledButtonProps) =>
  handleLinkWrapping(StyledButton, props);

export const PrimaryButton = (props: ButtonProps & IStyledButtonProps) =>
  handleLinkWrapping(StyledPrimaryButton, props);
