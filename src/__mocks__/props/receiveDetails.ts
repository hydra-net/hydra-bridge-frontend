import { IconKeys } from "../../common/components/Atoms/Icons/Icon";
import { ReceiveDetailsAccordionProps } from "../../common/components/Atoms/ReceiveDetails/ReceiveDetailsAccordion";

export const mockReceiveDetailsProps: ReceiveDetailsAccordionProps = {
  iconKey: "hopChain" as IconKeys,
  chainName: "Hop",
  gasFees: 0.39979797399225586,
  serviceTime: 30,
  transactionFees: "0.00001",
  slippage: "0.00001",
  amountOut: "0.00001",
  symbol: "ETH",
};
