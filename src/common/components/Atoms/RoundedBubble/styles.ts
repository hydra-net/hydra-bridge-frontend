import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const StyledBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.paragraph.md};
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeight.normal};
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 100%;
  background: transparent
    linear-gradient(
      90deg,
      ${theme.colors.blue.lightest} 0,
      ${theme.colors.blue.medium} 100%
    )
    0 0 no-repeat padding-box;
`;
