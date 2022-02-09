import styled, { CSSProperties } from "styled-components";
import Icon from "../Icon/Icon";
import Select from "react-select";
import IconOption from "../Select/IconOption";
import ValueOption from "../Select/ValueOption";
import { getFlexCenter, getHorizontalGap } from "../../styles";
import { TokenResponseDto } from "../../dtos";
import { IconKeys, ISelectOption } from "../../commonTypes";
import { ETH } from "../../constants";

const Root = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  ${getHorizontalGap("10px")}
  ${getFlexCenter}
`;

const Label = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.heading.xs};
  color: ${({ theme }) => theme.secondaryColor};
`;

const StyledSelect = styled(Select)`
  width: 150px;
  border-radius: 10px;

  .send-asset-select__control {
    border-radius: 20px !important;
  }
`;

type Props = {
  selectedTokenId: number;
  isLoading?: boolean;
  tokens: TokenResponseDto[];
  isDisabled: boolean;
  onSelectAsset: (option: any) => void;
};
const AssetSelect = ({
  isLoading,
  isDisabled,
  selectedTokenId,
  tokens,
  onSelectAsset,
}: Props) => {
  const customStyles: any = {
    control: (provided: CSSProperties) => ({
      ...provided,
      borderRadius: "10px",
    }),
  };

  const options: ISelectOption[] = tokens.map((token: TokenResponseDto) => {
    const isEth = token.symbol.toLocaleLowerCase() === ETH;
    return {
      label: token.symbol,
      value: token.id,
      icon: (
        <Icon
          name={
            isEth ? "ethereum" : (token.symbol.toLocaleLowerCase() as IconKeys)
          }
          size="20px"
        />
      ),
    };
  });

  return (
    <Root>
      <Container>
        <Label>Send</Label>
        <StyledSelect
          styles={customStyles}
          value={
            options.find((option) => option.value === selectedTokenId) || null
          }
          options={options}
          placeholder={null}
          onChange={onSelectAsset}
          components={{ Option: IconOption, SingleValue: ValueOption }}
          isDisabled={isLoading || isDisabled}
        />
      </Container>
    </Root>
  );
};

export default AssetSelect;
