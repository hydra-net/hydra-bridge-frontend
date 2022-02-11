import styled from 'styled-components';
import { getHorizontalGap } from '../../styles';
import { IconKeys } from '../../commonTypes';
import { RouteDto } from '../../dtos';
import { ETH } from '../../constants';
import AmountContainer from './AmountContainer';
import BridgeInfo from './BridgeInfo';

const Root = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  ${getHorizontalGap('5px')};
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  route: RouteDto;
  isSelected: boolean;
};

const RouteItems = ({ route, isSelected }: Props) => {
  const assetIconName =
    route.bridgeRoute.fromAsset.symbol.toLocaleLowerCase() === ETH
      ? ('ethereum' as IconKeys)
      : (route.bridgeRoute.fromAsset.symbol.toLocaleLowerCase() as IconKeys);

  return (
    <Root>
      <Container>
        <AmountContainer
          iconName={assetIconName}
          amount={route.bridgeRoute.amountIn}
          isSelected={isSelected}
          isAmountIn={true}
        />
        <BridgeInfo
          bridgeName={route.bridgeRoute.bridgeName}
          bridgeDisplayName={route.bridgeRoute.bridgeInfo.displayName}
        />

        <AmountContainer
          iconName={assetIconName}
          amount={route.bridgeRoute.amountOut}
          isSelected={isSelected}
          isAmountIn={false}
        />
      </Container>
    </Root>
  );
};

export default RouteItems;
