import styled, { useTheme } from "styled-components";
import { getBridgeIconName } from "../../../helpers/bridgeHelper";
import { IconKeys } from "../../commonTypes";
import { RouteDto } from "../../dtos";
import { getFlexCenter, getHorizontalGap, getVerticalGap } from "../../styles";
import Icon from "../Icon/Icon";

const Route = styled.div<{ isSelected?: boolean }>`
  height: 100px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.buttonDefaultColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.greenColor : "transparent"};
  color: ${(props) =>
    props.isSelected ? props.theme.primaryColor : props.theme.secondaryColor};
`;

const RouteContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 10px 0px 10px;
  height: 100%;
`;

const RouteItems = styled.div`
  width: 100%;
  display: flex;
  ${getHorizontalGap("5px")};
  flex-direction: row;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${getFlexCenter};
  ${getHorizontalGap("10px")};
`;

const AmountStyled = styled.div`
  font-size: ${({ theme }) => theme.heading.xs};
`;

const BridgeIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${getFlexCenter};
  ${getVerticalGap("5px")};
  ${getHorizontalGap("5px")};
`;

const BridgeNameStyled = styled.div`
  font-size: ${({ theme }) => theme.heading.xs};
`;

const FeeContainer = styled.div`
  font-size: ${({ theme }) => theme.paragraph.lg};
  font-weight: 700;
  margin-bottom: 5px;
`;

type Props = {
  route: RouteDto;
  selectedRouteId: number;
  onRouteSelect: (id: number) => void;
};
const BridgeRoute = ({ route, selectedRouteId, onRouteSelect }: Props) => {
  const theme = useTheme();
  const assetIconName =
    route.bridgeRoute.fromAsset.symbol.toLocaleLowerCase() === "eth"
      ? ("ethereum" as IconKeys)
      : (route.bridgeRoute.fromAsset.symbol.toLocaleLowerCase() as IconKeys);
  const isSelected = selectedRouteId === route.id;

  const formatAmountIn =
    route.bridgeRoute.amountIn !== ""
      ? route.bridgeRoute.amountIn.length > 6
        ? route.bridgeRoute.amountIn.substring(0, 5) + "..."
        : route.bridgeRoute.amountIn
      : "";
  const formatAmountOut =
    route.bridgeRoute.amountOut !== ""
      ? route.bridgeRoute.amountOut.length > 6
        ? route.bridgeRoute.amountOut.substring(0, 5) + "..."
        : route.bridgeRoute.amountOut
      : "";

  return (
    <Route isSelected={isSelected} onClick={() => onRouteSelect(route.id)}>
      <RouteContent>
        <FeeContainer>
          {" Gas fee: ~$" +
            (Math.round(route.transactionCoastUsd * 100) / 100).toFixed(2) +
            " | " +
            "~" +
            route.bridgeRoute.bridgeInfo.serviceTime / 60 +
            " min"}
        </FeeContainer>

        <RouteItems>
          <AmountContainer>
            <div>
              <Icon name={assetIconName} />
            </div>
            <AmountStyled>{formatAmountIn}</AmountStyled>
          </AmountContainer>

          <Icon
            name="arrowRight"
            color={isSelected ? theme.primaryColor : theme.secondaryColor}
          />
          <BridgeIconContainer>
            <Icon
              height="24px"
              width="24px"
              name={getBridgeIconName(route.bridgeRoute.bridgeName) as IconKeys}
            />
            <BridgeNameStyled>
              {route.bridgeRoute.bridgeInfo.displayName}
            </BridgeNameStyled>
          </BridgeIconContainer>

          <Icon
            name="arrowRight"
            color={isSelected ? theme.primaryColor : theme.secondaryColor}
          />
          <AmountContainer>
            <div>
              <Icon name={assetIconName} />
            </div>
            <AmountStyled>{formatAmountOut}</AmountStyled>
          </AmountContainer>
        </RouteItems>
      </RouteContent>
    </Route>
  );
};

export default BridgeRoute;
