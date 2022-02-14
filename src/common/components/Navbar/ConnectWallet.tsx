import { useWeb3 } from "@chainsafe/web3-context";
import styled from "styled-components";
import { toast } from "react-toastify";

import "dotenv/config";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;
import { formatWalletAddress } from "../../../helpers/walletHelper";
import { getFlexCenter, getHorizontalGap } from "../../styles";

import { Button } from "../Atoms/Buttons/Button";
import Copy from "../Copy";

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

  // TODO translate once https://github.com/X9Developers/hydra-bridge-frontend/pull/7 is merged
  if (!address) {
    return (
      <Button iconName={"cutArrowRight"} onClick={handleConnectWallet}>
        Connect wallet
      </Button>
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
