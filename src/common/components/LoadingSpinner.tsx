import Icon from "./Atoms/Icons/Icon";
import { IStyleableProps } from "../commonTypes";
import styled from "styled-components";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
const Spinner = styled(Icon)<LoadingSpinnerProps>`
  margin: 0 auto;
  color: ${(props) => (props.color ? props.color : theme.colors.white)};
  animation: load3 1.4s infinite linear;
  max-width: ${(props) => props.maxWidth ?? "2.4rem"};

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

type LoadingSpinnerProps = {
  color?: string;
  size?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
};
const LoadingSpinner = ({
  ...props
}: LoadingSpinnerProps & IStyleableProps) => {
  return <Spinner {...props} name={"loadingSpinner"} />;
};

export default LoadingSpinner;
