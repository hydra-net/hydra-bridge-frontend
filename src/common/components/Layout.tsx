import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { StakenetGlobalStyle } from "../../shell/theme/stakenetGlobalStyle";
import Navbar from "./Navbar/Navbar";
import Web3Wrapper from "./Web3Wrapper";
import { stakenetTheme } from "../../shell/theme/stakenetTheme";

interface ILayoutProps {
  theme: any;
  children: ReactNode;
}

const Root = styled.div``;

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={{ ...theme, sTheme: stakenetTheme }}>
      <StakenetGlobalStyle />
      <Web3Wrapper>
        <Navbar />
        <Root>{children}</Root>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
