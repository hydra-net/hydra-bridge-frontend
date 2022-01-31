import { ReactNode } from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon/Icon";
import { IconKeys, IStyleableProps } from "../../commonTypes";
import { getFlexCenter, getAbsoluteFill } from "../../styles";
import LoadingSpinner from "../LoadingSpinner";


interface IStyledButtonProps {
  $height?: string;
  $width?: string;
  $background?: string;
  $backgroundHover?: string;
  $fullWidth?: boolean;
  $borderColor?: string;
  $isLoading?: boolean;
}

interface IStyledLabelProps {
  $color?: string;
  $fontWeight?: string;
}

const StyledButton = styled.button<IStyledButtonProps>`
  background: ${({ theme, $background }) => $background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: ${({ $height }) => $height || "40px"};
  ${getFlexCenter};
  cursor: pointer;
  text-decoration: none;
  padding: 0 16px;
  width: ${({ $width, $fullWidth }) =>
    $fullWidth ? "100%" : $width || "auto"};
  transition: background-color 200ms linear;
  position: relative;
  border: ${(props) =>
    props.$borderColor ? `1px solid ${props.$borderColor}` : "none"};

  &:hover:not(:disabled) {
    background: ${({ theme, $backgroundHover }) =>
      $backgroundHover};
  }

  &:disabled {
    cursor: not-allowed;

    ${({ $isLoading, theme }) =>
      !$isLoading &&
      css`
        background-color: ${theme.greyColor};
      `};
  }
`;

const StyledButtonContent = styled.div<{ $isLoading: boolean }>`
  width: 100%;
  ${getFlexCenter};
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
`;

const SpinnerWrapper = styled.div`
  z-index: 1;
  ${getAbsoluteFill}
  ${getFlexCenter}
`;

export const Label = styled.p<IStyledLabelProps>`
font-weight:  ${({ $fontWeight }) => $fontWeight || '400'};
font-size: ${(props) => props.theme.paragraph.lg};
line-height: 20px;
  color: ${({ theme, $color }) => $color || theme.primaryColor};
  white-space: nowrap;
  &:first-letter {
    text-transform: uppercase;
  }
`;

const StyledIcon = styled(Icon)`
  margin-left: 14px;
`;

export interface ButtonProps {
  text?: string;
  label?: ReactNode;
  iconSrc?: string;
  iconName?: IconKeys;
  iconSize?: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  fullWidth?: boolean;
  onClick?: (e?: any) => void;
  background?: string;
  backgroundHover?: string;
  labelColor?: string;
  borderColor?: string;
  children?: ReactNode;
  isLoading?: boolean;
  [prop: string]: any;
}

const Button = ({
  text,
  label,
  iconSrc,
  iconName,
  iconSize,
  disabled,
  onClick,
  height,
  width,
  fullWidth,
  background,
  backgroundHover,
  children,
  isLoading,
  labelColor,
  borderColor,
  fontWeight,
  ...props
}: ButtonProps & IStyleableProps) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || isLoading}
      $background={background}
      $fullWidth={fullWidth}
      $backgroundHover={backgroundHover}
      $height={height}
      $width={width}
      $borderColor={borderColor}
      $isLoading={!!isLoading}
      {...props}
    >
      <StyledButtonContent $isLoading={!!isLoading}>
        {children || (
          <>
            {label || <Label $fontWeight={fontWeight} $color={labelColor}>{text}</Label>}
            {(iconSrc || iconName) && (
              <StyledIcon
                src={iconSrc}
                name={iconName}
                size={iconSize || "14px"}
              />
            )}
          </>
        )}
      </StyledButtonContent>
      {isLoading && (
        <SpinnerWrapper>
          <LoadingSpinner style={{ color: labelColor }} />
        </SpinnerWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
