import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";

import { SelectOptionType } from "../Molecules/BrandSelect/SelectOption";

import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../media";
import BrandSelect from "../Molecules/BrandSelect/BrandSelect";

const ResponsiveFlexWrapper = styled(FlexWrapper)`
  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: space-between;

    .flex-wrapper {
      width: 45%;
    }
  }
`;

type TransferChainSelectsProps = {
  optionsChainsFrom: SelectOptionType[];
  optionsChainsTo: SelectOptionType[];
  chainFrom: number;
  chainTo: number;
  isDisabled: boolean;
  onSelectChainFrom: (option: any) => void;
  onSelectChainTo: (option: any) => void;
};
const TransferChainSelects = ({
  optionsChainsFrom,
  optionsChainsTo,
  chainFrom,
  chainTo,
  isDisabled,
  onSelectChainFrom,
  onSelectChainTo,
}: TransferChainSelectsProps) => {
  const { t } = useTranslation();

  /**
   * Filter through the options the current value
   * @param options - The SelectOptionType
   * @param value - The current network value from parent
   * @return - The result or null
   */
  const getValueFromOptions = (
    options: SelectOptionType[],
    value: number
  ): SelectOptionType | null =>
    options.find((option: SelectOptionType) => option.value === value) || null;

  return (
    <ResponsiveFlexWrapper>
      <FlexWrapper
        className={"flex-wrapper"}
        alignItems={"start"}
        margin={`0 0 ${theme.margin.default} 0`}
      >
        <BrandSelect
          label={t("transfer-from")}
          value={getValueFromOptions(optionsChainsFrom, chainFrom)}
          options={optionsChainsFrom}
          placeholder={t("select-chain")}
          isDisabled={isDisabled}
          onChange={onSelectChainFrom}
        />
      </FlexWrapper>
      <FlexWrapper
        className={"flex-wrapper"}
        alignItems={"start"}
        margin={`0 0 ${theme.margin.default} 0`}
      >
        <BrandSelect
          label={t("transfer-to")}
          value={getValueFromOptions(optionsChainsTo, chainTo)}
          options={optionsChainsTo}
          placeholder={t("select-chain")}
          isDisabled={isDisabled}
          onChange={onSelectChainTo}
        />
      </FlexWrapper>
    </ResponsiveFlexWrapper>
  );
};

export default TransferChainSelects;
