import styled, { CSSProperties } from "styled-components";
import Select from "react-select";

import Icon from "../Icon/Icon";
import IconOption from "../Select/IconOption";
import ValueOption from "../Select/ValueOption";
import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";

import { TokenResponseDto } from "../../dtos";
import { IconKeys, ISelectOption, IStyleableProps } from "../../commonTypes";
import { ETH } from "../../constants";
import { legacyTheme } from "../../../shell/theme/legacyTheme";

const StyledSelect = styled(Select)`
  width: 100%;
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
  className,
}: Props & IStyleableProps) => {
  const customStyles: any = {
    control: (provided: CSSProperties) => ({
      ...provided,
      fontSize: legacyTheme.paragraph.lg,
      borderRadius: "10px",
    }),
    menu: (provided: CSSProperties) => ({
      ...provided,
      fontSize: legacyTheme.paragraph.md,
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
    <div className={className}>
      <FlexWrapper flexDirection={"row"} justifyContent={"space-between"}>
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
      </FlexWrapper>
    </div>
  );
};

export default AssetSelect;
