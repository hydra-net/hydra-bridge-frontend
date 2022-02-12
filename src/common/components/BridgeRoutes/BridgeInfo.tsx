import styled from "styled-components";
import { getBridgeIconName } from "../../../helpers/bridgeHelper";
import { IconKeys } from "../../commonTypes";
import { getFlexCenter, getHorizontalGap, getVerticalGap } from "../../styles";
import Icon from "../Icon/Icon";

const Root = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  ${getFlexCenter};
  ${getVerticalGap("5px")};
  ${getHorizontalGap("5px")};
`;

const DisplayName = styled.p`
  font-size: ${({ theme }) => theme.heading.xs};
`;

type Props = {
  bridgeName: string;
  bridgeDisplayName: string;
};

const BridgeInfo = ({ bridgeName, bridgeDisplayName }: Props) => {
  return (
    <Root>
      <Container>
        <Icon
          height="24px"
          width="24px"
          name={getBridgeIconName(bridgeName) as IconKeys}
        />
        <DisplayName>{bridgeDisplayName}</DisplayName>
      </Container>
    </Root>
  );
};

export default BridgeInfo;
