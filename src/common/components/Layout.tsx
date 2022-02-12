import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import { LegacyGlobalStyle } from "../../shell/theme/legacyGlobalStyle";
import Navbar from "./Navbar/Navbar";
import Web3Wrapper from "./Web3Wrapper";

interface ILayoutProps {
  theme: any;
  children: ReactNode;
}

const Root = styled.div``;

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <LegacyGlobalStyle />
      <Web3Wrapper>
        <Navbar />
        <Root>{children}</Root>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
