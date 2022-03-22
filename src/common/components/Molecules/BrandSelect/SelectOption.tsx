import { components } from "react-select";
import styled from "styled-components";

import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import Icon from "../../Atoms/Icons/Icon";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

const CustomFlexWrapper = styled(FlexWrapper)`
  .icon {
    margin-right: ${theme.margin.md};
  }
`;

export type SelectOptionType = {
  label: string;
  value: number;
  iconName?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
};

/**
 * Extend react-select SelectValue component
 * however, it is really tricky to add a type to the props since they are unknown on the library
 * Please refers to the the type above SelectValueType to know what's
 * @param props - children and the data property from react-select
 */
const SelectOption = (props: any) => {
  const { Option } = components;

  return (
    <Option {...props}>
      <CustomFlexWrapper flexDirection={"row"} justifyContent={"start"}>
        {props?.data?.iconName && (
          <Icon
            name={props.data.iconName}
            width={"3.2rem"}
            height={"3.2rem"}
            className={"icon"}
          />
        )}
        <div>{props?.data?.label}</div>
      </CustomFlexWrapper>
    </Option>
  );
};

export default SelectOption;
