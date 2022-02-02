import styled from "styled-components";

const Root = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.paragraph.lg};
  font-weight: 700;
`;

type Props = {
  transactionCoastUsd: number;
  serviceTime: number;
};

const TransferFees = ({ transactionCoastUsd, serviceTime }: Props) => {
  return (
    <Root>
      {" Gas fee: ~$" +
        (Math.round(transactionCoastUsd * 100) / 100).toFixed(2) +
        " | " +
        "~" +
        serviceTime / 60 +
        " min"}
    </Root>
  );
};
export default TransferFees;
