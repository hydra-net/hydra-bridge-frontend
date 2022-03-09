import styled, { keyframes } from "styled-components";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export type RectangleSkeletonProps = {
  height?: string;
  width?: string;
  marginTop?: string;
};
export const RectangleSkeleton = styled.div<RectangleSkeletonProps>`
  display: inline-block;
  height: ${(props) => props.height || "4rem"};
  width: ${(props) => props.width || "100%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: ${theme.colors.blue.darker};
  background-image: linear-gradient(
    90deg,
    ${theme.colors.blue.darker},
    ${theme.colors.blue.dark},
    ${theme.colors.blue.darker}
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: ${(props) => props.marginTop || "0"};
`;
