import { components } from "react-select";
import styled from "styled-components";
import { getFlexStart, getHorizontalGap } from "../../styles";

const Container = styled.div`
  flex-direction: row;
  ${getFlexStart};
  ${getHorizontalGap("10px")};
`;


const IconOption = (props: any) => {
  const { Option } = components;

  return (
    <Option {...props}>
      <Container>
        <div>{props.data.icon}</div>
        <div>{props.data.label}</div>
      </Container>
    </Option>
  );
};

export default IconOption;
