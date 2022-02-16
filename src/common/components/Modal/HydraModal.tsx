import Modal from "react-modal";
import styled from "styled-components";

import "./styles.css";
import { getFlexCenter } from "../../styles";
import { Button } from "../Atoms/Buttons/Button";
import { NETWORK_EXPLORER_URLS } from "../../constants";
import { SupportedChainId } from "../../enums";
import { legacyTheme } from "../../../shell/theme/legacyTheme";

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
  let transUrl = `${NETWORK_EXPLORER_URLS[SupportedChainId.MAINNET]}/tx/${tx}`;

  if (network === SupportedChainId.GOERLI) {
    transUrl = `${NETWORK_EXPLORER_URLS[SupportedChainId.GOERLI]}/tx/${tx}`;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 style={{ fontSize: legacyTheme.heading.sm }}>{subtitle}</h2>

      <Content>
        <a
          href={transUrl}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: legacyTheme.paragraph.lg }}
        >
          {tx}
        </a>
      </Content>
      <Button fullWidth={true} onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default HydraModal;
