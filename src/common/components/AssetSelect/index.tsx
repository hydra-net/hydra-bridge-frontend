import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";

import { TokenResponseDto } from "../../dtos";
import { IStyleableProps } from "../../commonTypes";
import BrandSelect from "../Molecules/BrandSelect/BrandSelect";
import { useTranslation } from "react-i18next";
import { InputLabel } from "../Atoms/Label/Label";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { SelectOptionType } from "../Molecules/BrandSelect/SelectOption";

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
      <FlexWrapper
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputLabel
          fontWeight={theme.fontWeight.semibold}
          margin={`0 ${theme.margin.md} 0 0`}
        >
          {t("common.send")}
        </InputLabel>
        <BrandSelect
          value={
            options.find((option) => option.value === selectedTokenId) || null
          }
          options={options}
          placeholder={t("select-an-asset")}
          onChange={onSelectAsset}
          isDisabled={isLoading || isDisabled}
        />
      </FlexWrapper>
    </div>
  );
};

export default AssetSelect;
