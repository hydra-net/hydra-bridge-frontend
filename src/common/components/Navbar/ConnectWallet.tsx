import { useWeb3 } from "@chainsafe/web3-context";
import styled, { useTheme } from "styled-components";
import { getFlexCenter, getHorizontalGap } from "../../styles";
import Button from "../Buttons/Button";
import Copy from "../Copy";
import { toast } from "react-toastify";
import { formatWalletAddress } from "../../../helpers/walletHelper";
import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

const Root = styled.div`
  max-width: 160px;
`;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<{ $isWrongNetwork: boolean }>`
  padding: 10px 20px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) =>
    props.$isWrongNetwork ? "rgb(218, 45, 43)" : "rgb(226, 226, 229)"};
  font-weight: 700;
  cursor: pointer;
  ${getFlexCenter};
  display: flex;
  ${getHorizontalGap("5px")};
`;

const AddressContainer = styled.div``;

const ConnectWallet = () => {
  const theme = useTheme();
  const { onboard, wallet, address, network } = useWeb3();
  const isWrongNetwork = parseInt(REACT_APP_DEFAULT_NETWORK_ID!) !== network;

  const handleConnectWallet = async () => {
    if (!wallet) {
      await onboard?.walletSelect();
    }

    await onboard?.walletCheck();
  };
  const notify = () =>
    toast.info("Copied!", {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: false,
    });
  if (!address) {
    return (
      <Button
        background={theme.blueColor}
        fontWeight={"700"}
        width={"160px"}
        text={"Connect wallet"}
        onClick={handleConnectWallet}
      />
    );
  }
  return (
    <Root>
      <Container>
        <Wrapper $isWrongNetwork={isWrongNetwork}>
          <AddressContainer>
            {formatWalletAddress(isWrongNetwork, address)}
          </AddressContainer>
          {!isWrongNetwork && <Copy payload={address || ""} onCopy={notify} />}
        </Wrapper>
      </Container>
    </Root>
  );
};

export default ConnectWallet;
