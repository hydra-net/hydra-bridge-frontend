import React from "react";

import Icon from "./Icon/Icon";
type Props = {
  onCopy?: () => void;
  payload: string;
  size?: string;
  color?: string;
};

const Copy = ({ payload, size, color, onCopy }: Props) => {
  const onCopyClicked = (e: any) => {
    console.log("onCopyClicked");
    // prevent parent click handler from firing
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(payload).then(
      () => {
        console.log("onCopy ?");
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
    <Icon
      color={color}
      size={size}
      name={"copy"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onCopyClicked(e)}
    />
  );
};

export default Copy;
