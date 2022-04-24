import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ExternalLink } from "../Links/Link";

import { formatTxHash } from "../../../../helpers/walletHelper";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

interface ToastContentTransactionHashProps {
  txHash: string;
  txUrl: string;
}
export const ToastContentTransactionHash = ({
  txHash,
  txUrl,
}: ToastContentTransactionHashProps) => {
  const { t } = useTranslation();
  /**
   * Memo styles to avoid useless re-renders with inline styles
   */
  const memoStylesTransactionHash = useMemo(
    () => ({
      fontSize: theme.paragraph.md,
      margin: "0 0 .9rem 0",
    }),
    []
  );

  return (
    <div>
      <p style={memoStylesTransactionHash}>{t("common.transaction-hash")}</p>
      <ExternalLink href={txUrl} ariaLabel={t("common.view-on-explorer")}>
        {formatTxHash(txHash)}
      </ExternalLink>
    </div>
  );
};
