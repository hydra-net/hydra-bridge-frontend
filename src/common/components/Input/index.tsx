import React from "react";
import styled from "styled-components";
import { getVerticalGap } from "../../styles";

const Container = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => props.theme.primaryColor};
  width: 100%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  flex-direction: column;
  ${getVerticalGap("5px")};
`;

const Input = styled.input`
  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  min-height: 38px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px 0 10px;
  outline: 0!important;
  font: inherit;
`;

const Label = styled.div`
  font-weight: 700; 
  font-size: ${({ theme }) => theme.paragraph.lg};
  color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 5px;
`;

type Props = {
  amount?: number;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
};

const AmountInput = ({
  amount,
  label,
  onChange,
  min,
  max,
  placeholder,
  step = 0.1,
  disabled
}: Props) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type="number"
        value={amount ?? min}
        placeholder={placeholder}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        
      />
    </Container>
  );
};

export default AmountInput;
