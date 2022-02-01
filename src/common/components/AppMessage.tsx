import React from "react";
import styled from "styled-components";
import { getFlexCenter } from "../styles";

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  border: 1px solid ${(props) => props.theme.redColor};
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
`;

const ErrorTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
`;

const ErrorText = styled.p`
  padding-left: 10px;
  font-size: ${(props) => props.theme.paragraph.lg};
  font-weight: 700;
  line-height: 16px;
  color: ${({ theme }) => theme.redColor} !important;
`;

const ButtonContainer = styled.div`
  padding-left: 5px;
  ${getFlexCenter};
`;

const StyledButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid ${({ theme }) => theme.redColor};
  width: 22px;
  height: 22px;
  margin-right: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SpanText = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.paragraph.lg};
  color: ${({ theme }) => theme.redColor};
`;

interface IAppMessage {
  isOpen?: boolean;
  message?: any;
  onClose?: () => void;
}

const AppMessage = ({ isOpen, message, onClose }: IAppMessage) => {
  return isOpen && message ? (
    <Root>
      <Container>
        <ErrorTextContainer>
          <ErrorText>{message}</ErrorText>
        </ErrorTextContainer>
        <ButtonContainer>
          <StyledButton onClick={onClose}>
            <SpanText>x</SpanText>
          </StyledButton>
        </ButtonContainer>
      </Container>
    </Root>
  ) : null;
};

export default AppMessage;
