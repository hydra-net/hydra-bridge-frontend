import  { components } from "react-select";
import styled from "styled-components";
import { getFlexStart, getHorizontalGap } from "../../styles";

const Container = styled.div`
  flex-direction: row;
  ${getFlexStart};
  ${getHorizontalGap("10px")};
`;

const ValueOption = (props: any) => {
  const { SingleValue } = components;

  return (
    <SingleValue {...props}>
      <Container>
        <div>{props.data.icon}</div>
        <div>{props.data.label}</div>
      </Container>
    </SingleValue>
  );
};

export default ValueOption;
