import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../shell/theme/globalStyle";
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
        <Navbar />
        <Root>{children}</Root>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
