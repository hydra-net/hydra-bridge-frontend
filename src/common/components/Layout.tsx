import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import Web3Wrapper from "./Web3Wrapper";
import { StakenetGlobalStyle } from "../../shell/theme/stakenetGlobalStyle";

import { Container } from "./Atoms/Containers/Container";

import { ContainerType } from "../enums";
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
        <Container type={ContainerType.XXXL} noGutter={true}>
          <Root>{children}</Root>
        </Container>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
