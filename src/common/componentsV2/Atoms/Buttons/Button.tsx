import { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import {
  IStyledButtonProps,
  StyledButton,
  StyledPrimaryButton,
} from "./styles";
import Icon from "../../../components/Icon/Icon";
import { IconKeys } from "../../../commonTypes";

type ButtonProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e?: any) => void;
  children?: ReactNode;
  iconName?: IconKeys;
  iconSize?: string;
};

const handleLinkWrapping = (
  Component: StyledComponent<"button", any>,
  { isDisabled, onClick, children, ...props }: ButtonProps & IStyledButtonProps
) => {
  return (
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
};

export const Button = (props: ButtonProps & IStyledButtonProps) =>
  handleLinkWrapping(StyledButton, props);

export const PrimaryButton = (props: ButtonProps & IStyledButtonProps) =>
  handleLinkWrapping(StyledPrimaryButton, props);
