import styled from "styled-components";
import spinnerIcon from "../../assets/spinner-icon.svg";
import { IStyleableProps } from "../commonTypes";

const Spinner = styled.img<{ maxWidth?: string }>`
  margin: 0 auto;
  animation: load3 1.4s infinite linear;
  max-width: ${(props) => props.maxWidth ?? "30px"};

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

interface Props extends IStyleableProps {
  maxWidth?: string;
}

const LoadingSpinner = (props: Props) => {
  return <Spinner src={spinnerIcon} maxWidth={props.maxWidth} {...props} />;
};

export default LoadingSpinner;
