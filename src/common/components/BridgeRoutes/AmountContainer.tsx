import styled, { useTheme } from 'styled-components';
import { IconKeys } from '../../commonTypes';
import { getFlexCenter, getHorizontalGap } from '../../styles';
import Icon from '../Icon/Icon';

const Root = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${getHorizontalGap('10px')};
  ${getFlexCenter};
`;
const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${getFlexCenter};
  ${getHorizontalGap('10px')};
`;

const AmountStyled = styled.p`
  font-size: ${({ theme }) => theme.heading.xs};
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

type Props = {
  iconName: IconKeys;
  amount: string;
  isSelected: boolean;
  isAmountIn: boolean;
};

const AmountContainer = ({
  iconName,
  amount,
  isSelected,
  isAmountIn,
}: Props) => {
  const theme = useTheme();
  return (
    <Root>
      <Container>
        {!isAmountIn && (
          <Icon
            name="arrowRight"
            color={isSelected ? theme.primaryColor : theme.secondaryColor}
          />
        )}
        <AmountWrapper>
          <div>
            <Icon name={iconName} />
          </div>
          <AmountStyled>{amount}</AmountStyled>
        </AmountWrapper>
        {isAmountIn && (
          <Icon
            name="arrowRight"
            color={isSelected ? theme.primaryColor : theme.secondaryColor}
          />
        )}
      </Container>
    </Root>
  );
};

export default AmountContainer;
