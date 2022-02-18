import styled, { CSSProperties } from "styled-components";
import Select from "react-select";
import IconOption from "../Select/IconOption";
import ValueOption from "../Select/ValueOption";
import { ISelectOption } from "../../commonTypes";
import { legacyTheme } from "../../../shell/theme/legacyTheme";
import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";
import { devicesUp } from "../../../media";
import { InputLabel } from "../Atoms/Label/Label";
import { useTranslation } from "react-i18next";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

const ResponsiveFlexWrapper = styled(FlexWrapper)`
  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: space-between;

    .flex-wrapper {
      width: 45%;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

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

type Props = {
  chainsFrom: ISelectOption[];
  chainsTo: ISelectOption[];
  chainFrom: number;
  chainTo: number;
  isDisabled: boolean;
  onSelectChainFrom: (option: any) => void;
  onSelectChainTo: (option: any) => void;
};
const TransferChainSelects = ({
  chainsFrom,
  chainsTo,
  chainFrom,
  chainTo,
  isDisabled,
  onSelectChainFrom,
  onSelectChainTo,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ResponsiveFlexWrapper>
      <FlexWrapper
        className={"flex-wrapper"}
        alignItems={"start"}
        margin={`0 0 ${theme.margin.xl} 0`}
      >
        <InputLabel fontWeight={theme.fontWeight.semibold}>
          {t("transfer-from")}
        </InputLabel>
        <StyledSelect
          value={
            chainsFrom.find((option) => option.value === chainFrom) || null
          }
          styles={customStyles}
          options={chainsFrom}
          placeholder={null}
          onChange={onSelectChainFrom}
          components={{ Option: IconOption, SingleValue: ValueOption }}
          isDisabled={isDisabled}
        />
      </FlexWrapper>
      <FlexWrapper
        className={"flex-wrapper"}
        alignItems={"start"}
        margin={`0 0 ${theme.margin.xl} 0`}
      >
        <InputLabel fontWeight={theme.fontWeight.semibold}>
          {t("transfer-to")}
        </InputLabel>
        <StyledSelect
          value={chainsTo.find((option) => option.value === chainTo) || null}
          styles={customStyles}
          options={chainsTo}
          placeholder={null}
          onChange={onSelectChainTo}
          components={{ Option: IconOption, SingleValue: ValueOption }}
          isDisabled={isDisabled}
        />
      </FlexWrapper>
    </ResponsiveFlexWrapper>
  );
};

export default TransferChainSelects;
