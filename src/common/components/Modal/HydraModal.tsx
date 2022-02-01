import Modal from "react-modal";
import styled from "styled-components";
import { getFlexCenter } from "../../styles";
import Button from "../Buttons/Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const StyledButton = styled(Button)`
  width: 100%;
`;
const Content = styled.div`
  ${getFlexCenter};
  margin-bottom: 20px;
`;

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

type Props = {
  network: number;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  tx: string;
};
const HydraModal = ({ network, subtitle, tx, isOpen, onClose }: Props) => {
  let transUrl = `https://etherscan.io/tx/${tx}`;

  if (network === 5) {
    transUrl = `https://goerli.etherscan.io/tx/${tx}`;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>{subtitle}</h2>

      <Content>
        <a href={transUrl} target="_blank" rel="noreferrer">
          {tx}
        </a>
      </Content>
      <StyledButton onClick={onClose}>Close</StyledButton>
    </Modal>
  );
};

export default HydraModal;
