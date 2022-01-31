import copyIcon from "../../assets/copy-icon.svg";
import styled from "styled-components";

type Props = {
  onCopy?: () => void;
  payload: string;
  size?: string;
};

const CopyIcon = styled.img<{ size?: string }>`
  width: ${(props) => props.size ?? "20px"};
  height: ${(props) => props.size ?? "20px"};
`;

const Copy = ({ payload, size, onCopy }: Props) => {
  const onCopyClicked = (e: any) => {
    // prevent parent click handler from firing
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(payload).then(
      () => {
        if (onCopy) {
          onCopy();
        }
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <CopyIcon size={size} src={copyIcon} onClick={(e) => onCopyClicked(e)} />
  );
};

export default Copy;
