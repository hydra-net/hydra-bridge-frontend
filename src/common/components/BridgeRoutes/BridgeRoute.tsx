import styled from "styled-components";
import { RouteDto } from "../../dtos";
import RouteItems from "./RouteItems";
import TransferFees from "./TransferFees";

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
`;

type Props = {
  route: RouteDto;
  selectedRouteId: number;
  onRouteSelect: (id: number) => void;
};
const BridgeRoute = ({ route, selectedRouteId, onRouteSelect }: Props) => {
  const isSelected = selectedRouteId === route.id;
  return (
    <Route isSelected={isSelected} onClick={() => onRouteSelect(route.id)}>
      <RouteContent>
        <TransferFees
          transactionCoastUsd={route.transactionCoastUsd}
          serviceTime={route.bridgeRoute.bridgeInfo.serviceTime}
        />
        <RouteItems isSelected={isSelected} route={route} />
      </RouteContent>
    </Route>
  );
};

export default BridgeRoute;
