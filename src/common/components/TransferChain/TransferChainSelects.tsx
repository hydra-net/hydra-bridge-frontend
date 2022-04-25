import React, { useEffect, useState } from "react";
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
      width: 100%;
      max-width: ${theme.maxWidth.md};
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
  const [selectedOptionTo, setSelectedOptionTo] =
    useState<SelectOptionType | null>(null);
  const [selectedOptionFrom, setSelectedOptionFrom] =
    useState<SelectOptionType | null>(null);

  useEffect(() => {
    setSelectedOptionFrom(getValueFromOptions(optionsChainsFrom, chainFrom));
  }, [chainFrom, optionsChainsFrom]);

  useEffect(() => {
    setSelectedOptionTo(getValueFromOptions(optionsChainsTo, chainTo));
  }, [chainTo, optionsChainsTo]);

  /**
   * Filter through the options the current value
   * @param options - The SelectOptionType
   * @param value - The current network value from parent
   * @return - The result or null
   */
  const getValueFromOptions = (
    options: SelectOptionType[],
    value: number
  ): SelectOptionType | null => {
    return (
      options.find((option: SelectOptionType) => option.value === value) || null
    );
  };
  return (
    <ResponsiveFlexWrapper>
      <FlexWrapper
        className={"flex-wrapper"}
        alignItems={"start"}
        margin={`0 0 ${theme.margin.default} 0`}
      >
        <BrandSelect
          label={t("transfer-from")}
          value={selectedOptionFrom}
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
          value={selectedOptionTo}
          options={optionsChainsTo}
          placeholder={t("select-chain")}
          isDisabled={isDisabled}
          onChange={onSelectChainTo}
        />
      </FlexWrapper>
    </ResponsiveFlexWrapper>
  );
};

export default React.memo(TransferChainSelects);
