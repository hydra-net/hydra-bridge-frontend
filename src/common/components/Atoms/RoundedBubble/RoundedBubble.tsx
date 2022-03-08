import { StyledBubble } from "./styles";

type RoundedBubbleProps = {
  children: string | number;
};

const RoundedBubble = ({ children }: RoundedBubbleProps) => {
  return <StyledBubble>{children}</StyledBubble>;
};
export default RoundedBubble;
