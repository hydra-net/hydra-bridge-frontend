import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";
import BrandSelect from "../Molecules/BrandSelect/BrandSelect";

import { SelectOptionType } from "../Molecules/BrandSelect/SelectOption";
import { TokenResponseDto } from "../../dtos";
import { IStyleableProps } from "../../commonTypes";

import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../media";
import { InputLabel } from "../Atoms/Label/Label";

const ResponsiveFlexWrapper = styled(FlexWrapper)`
  flex-direction: column;
  align-items: start;

  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: end;
    align-items: center;

    .label {
      margin: 0 ${theme.margin.md} 0 0;
    }
    /* brand-select */
    & > div {
      max-width: ${theme.maxWidth.md};
    }
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
  const { t } = useTranslation();

  const options: SelectOptionType[] = tokens.map((token: TokenResponseDto) => ({
    label: token.symbol,
    value: token.id,
    iconName: `${token.symbol.toLocaleLowerCase()}Coin`,
  }));

  return (
    <div className={className}>
      <ResponsiveFlexWrapper flexDirection={"row"} alignItems={"center"}>
        <InputLabel className={"label"}>{t("common.send")}</InputLabel>
        <BrandSelect
          value={
            options.find((option) => option.value === selectedTokenId) || null
          }
          options={options}
          placeholder={t("select-an-asset")}
          onChange={onSelectAsset}
          isDisabled={isLoading || isDisabled}
        />
      </ResponsiveFlexWrapper>
    </div>
  );
};

export default AssetSelect;
