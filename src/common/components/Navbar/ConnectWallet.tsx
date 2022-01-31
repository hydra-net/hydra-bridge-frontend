import { useWeb3 } from "@chainsafe/web3-context";
import styled, { useTheme } from "styled-components";
import { getFlexCenter, getHorizontalGap } from "../../styles";
import Button from "../Buttons/Button";
import Copy from "../Copy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

const Root = styled.div`
  max-width: 160px;
`;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<{ $isRightNetwork: boolean }>`
  padding: 10px 20px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) =>
    props.$isRightNetwork ? "rgb(226, 226, 229)" : "rgb(218, 45, 43)"};
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

  const isRightNetwork =
    network && parseInt(REACT_APP_DEFAULT_NETWORK_ID!) === network
      ? true
      : false;

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
        <Wrapper $isRightNetwork={isRightNetwork}>
          <AddressContainer>
            {isRightNetwork
              ? address.substring(0, 6) + "..." + address.substring(38, 42)
              : "Wrong network"}
          </AddressContainer>
          {isRightNetwork && <Copy payload={address || ""} onCopy={notify} />}
        </Wrapper>
      </Container>
      <ToastContainer />
    </Root>
  );
};

export default ConnectWallet;
