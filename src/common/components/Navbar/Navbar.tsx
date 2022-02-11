import styled from "styled-components";
import { getFlexStart } from "../../styles";
import ConnectWallet from "./ConnectWallet";

const Root = styled.div`
  padding: 10px 67px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  ${getFlexStart};
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.heading.md};
  font-weight: 700;
`;

const Navbar = () => {
  return (
    <Root>
      <Container>
        <TitleContainer>
          <Title>Hydra bridge</Title>
        </TitleContainer>
        <ConnectWallet />
      </Container>
    </Root>
  );
};

export default Navbar;
