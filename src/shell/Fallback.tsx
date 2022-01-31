import styled from "styled-components";
import { getFlexCenter } from "../common/styles";
import LoadingSpinner from "../common/components/LoadingSpinner";

const Root = styled.div`
  ${getFlexCenter};
  height: 460px;
`;

const Fallback = () => {
  return (
    <Root>
      <LoadingSpinner />
    </Root>
  );
};

export default Fallback;
