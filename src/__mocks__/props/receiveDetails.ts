import { IconKeys } from "../../common/components/Atoms/Icons/Icon";
import { ReceiveDetailsAccordionProps } from "../../common/components/Atoms/ReceiveDetails/ReceiveDetailsAccordion";

export const mockReceiveDetailsProps: ReceiveDetailsAccordionProps = {
  iconKey: "hopChain" as IconKeys,
  chainName: "Hop",
  gasFees: 0.39979797399225586,
  serviceTime: 800,
  transactionFees: "0.00001 ETH",
  slippage: "0.00001 ETH",
  amountOut: "0.00001 ETH",
};
