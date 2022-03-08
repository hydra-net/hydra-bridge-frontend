import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const StyledBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeight.semibold};
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background: transparent
    linear-gradient(
      90deg,
      ${theme.colors.blue.lightest} 0,
      ${theme.colors.blue.medium} 100%
    )
    0 0 no-repeat padding-box;
`;
