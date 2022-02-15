import { useWeb3 } from "@chainsafe/web3-context";
import styled from "styled-components";
import { toast } from "react-toastify";

const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;
import { formatWalletAddress } from "../../../helpers/walletHelper";

import { Button } from "../Atoms/Buttons/Button";
import Copy from "../Copy";

const Root = styled.div`
  max-width: 160px;
`;

const Container = styled.div`
  width: 100%;
`;

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
        <Button>
          {formatWalletAddress(isWrongNetwork, address)}
          {!isWrongNetwork && (
            <span className={"btn-icon"}>
              <Copy
                payload={address || ""}
                color={"white"}
                size={"2rem"}
                onCopy={notify}
              />
            </span>
          )}
        </Button>
      </Container>
    </Root>
  );
};

export default ConnectWallet;
