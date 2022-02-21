import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import Web3Wrapper from "./Web3Wrapper";
import { StakenetGlobalStyle } from "../../shell/theme/stakenetGlobalStyle";

import { stakenetTheme } from "../../shell/theme/stakenetTheme";

interface ILayoutProps {
  theme: any;
  children: ReactNode;
}
const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={{ ...theme, sTheme: stakenetTheme }}>
      <StakenetGlobalStyle />
      <Web3Wrapper>
        <Root>{children}</Root>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
