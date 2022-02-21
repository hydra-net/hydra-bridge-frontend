import { useWeb3 } from "@chainsafe/web3-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { formatWalletAddress } from "../../../helpers/walletHelper";

import { Button } from "../Atoms/Buttons/Button";
import Copy from "../Copy";

const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

const ConnectWallet = () => {
  const { onboard, wallet, address, network } = useWeb3();
  const { t } = useTranslation();
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
      <Button iconName={"cutArrowRight"} onClick={handleConnectWallet}>
        {t("connect-wallet")}
      </Button>
    );
  }
  return (
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
  );
};

export default ConnectWallet;
