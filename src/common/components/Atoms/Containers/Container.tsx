import { ReactNode } from "react";

import { ContainerType } from "../../../enums";
import { IStyleableProps } from "../../../commonTypes";
import {
  StyledContainer,
  StyledContainerLG,
  StyledContainerXL,
  StyledContainer2XL,
  StyledContainer3XL,
  StyledContainerCard,
} from "./styles";

export type ContainerProps = {
  type?: ContainerType;
  children?: ReactNode;
  bg?: string;
  border?: string;
  borderRadius?: string;
  maxWidth?: string;
  noGutter?: boolean;
  padding?: string;
  boxShadow?: string;
  hasHoverEffect?: boolean;
};

export const Container = (props: ContainerProps & IStyleableProps) => {
  switch (props.type) {
    case ContainerType.LG:
      return <StyledContainerLG {...props}>{props.children}</StyledContainerLG>;
    case ContainerType.XL:
      return <StyledContainerXL {...props}>{props.children}</StyledContainerXL>;
    case ContainerType.XXL:
      return (
        <StyledContainer2XL {...props}>{props.children}</StyledContainer2XL>
      );
    case ContainerType.XXXL:
      return (
        <StyledContainer3XL {...props}>{props.children}</StyledContainer3XL>
      );
    default:
      return <StyledContainer {...props}>{props.children}</StyledContainer>;
  }
};

export const ContainerCard = (props: ContainerProps & IStyleableProps) => (
  <StyledContainerCard {...props}>{props.children}</StyledContainerCard>
);
