import React, { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledLink, StyledLinkProps } from "./styles";

type LinkProps = {
  children: ReactNode;
  href: string;
  target?: string;
  ariaLabel: string;
};

const handleLinkWrapping = (
  Component: StyledComponent<"a", any>,
  {
    children,
    href,
    target,
    ariaLabel,
    ...props
  }: LinkProps & StyledLinkProps & IStyleableProps
) => {
  return (
    <Component
      href={href}
      target={target ? target : "_blank"}
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ExternalLink = (
  props: LinkProps & StyledLinkProps & IStyleableProps
) => handleLinkWrapping(StyledLink, props);
