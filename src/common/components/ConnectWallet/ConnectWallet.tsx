import React from "react";
import { useWeb3 } from "@chainsafe/web3-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Button } from "../Atoms/Buttons/Button";
import Icon from "../Icon/Icon";

import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { DEFAULT_NOTIFY_CONFIG } from "../../constants";
import { formatWalletAddress } from "../../../helpers/walletHelper";
const { REACT_APP_DEFAULT_NETWORK_ID } = process.env;

const ConnectWallet = () => {
  const { onboard, wallet, address = "", network } = useWeb3();
  const { t } = useTranslation();

  const isWrongNetwork = parseInt(REACT_APP_DEFAULT_NETWORK_ID!) !== network;

  const handleConnectWallet = async () => {
    if (!wallet) {
      await onboard?.walletSelect();
    }
    await onboard?.walletCheck();
  };

  const handleCopyAddress = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    navigator.clipboard.writeText(address).then(
      () => {
        toast.info(t("notification.copied"), {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: 1000,
          pauseOnHover: false,
        });
      },
      (err) => {
        toast.error(`${t("notification.error-copy")} ${address} `, {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: false,
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  if (!address) {
    /* TODO 44 integrate font awesome in next PR and replace */
    return (
      <Button iconName={"cutArrowRight"} onClick={handleConnectWallet}>
        {t("connect-wallet")}
      </Button>
    );
  }
  return (
    <Button onClick={handleCopyAddress}>
      {formatWalletAddress(isWrongNetwork, address)}
      {!isWrongNetwork && (
        <span className={"btn-icon"}>
          <Icon color={theme.colors.white} size={"2rem"} name={"copy"} />
        </span>
      )}
    </Button>
  );
};

export default ConnectWallet;
