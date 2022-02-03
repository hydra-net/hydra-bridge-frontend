import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../shell/theme/globalStyle";
import { NetworkProvider } from "../context/NetworkContext";
import Navbar from "./Navbar/Navbar";
import Web3Wrapper from "./Web3Wrapper";

interface ILayoutProps {
  theme: any;
  children: any;
}

const Root = styled.div``;

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Web3Wrapper>
        <NetworkProvider>
          <Navbar />
          <Root>{children}</Root>
        </NetworkProvider>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
