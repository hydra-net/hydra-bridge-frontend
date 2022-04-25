import { useTranslation } from "react-i18next";

import { ExternalLink } from "../Links/Link";

import { formatTxHash } from "../../../../helpers/walletHelper";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { IInlineStyles } from "../../../commonTypes";

const styles: IInlineStyles = {
  transactionHash: {
    fontSize: theme.paragraph.md,
    margin: "0 0 .9rem 0",
  },
};
interface ToastContentTransactionHashProps {
  txHash: string;
  txUrl: string;
}
export const ToastContentTransactionHash = ({
  txHash,
  txUrl,
}: ToastContentTransactionHashProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <p style={styles.transactionHash}>{t("common.transaction-hash")}</p>
      <ExternalLink href={txUrl} ariaLabel={t("common.view-on-explorer")}>
        {formatTxHash(txHash)}
      </ExternalLink>
    </div>
  );
};
