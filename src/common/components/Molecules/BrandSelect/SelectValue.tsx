import { components } from "react-select";
import styled from "styled-components";

import { FlexWrapper } from "../../Atoms/Wrappers/Wrapper";
import Icon, { IconKeys } from "../../Atoms/Icons/Icon";

import { SelectOptionType } from "./SelectOption";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

const CustomFlexWrapper = styled(FlexWrapper)`
  .icon {
    margin-right: ${theme.margin.md};
  }
`;

export type SelectValueType = SelectOptionType | null;

/**
 * Extend react-select SelectValue component
 * however, it is really tricky to add a type to the props since they are unknown on the library
 * Please refers to the the type above SelectValueType to know what's
 * @param props - children and the data property from react-select
 */
const SelectValue = (props: any) => {
  const { SingleValue } = components;

  return (
    <SingleValue {...props}>
      <CustomFlexWrapper flexDirection={"row"} justifyContent={"start"}>
        {props?.data?.iconName && (
          <Icon
            name={props.data.iconName as IconKeys}
            width={"3.2rem"}
            height={"3.2rem"}
            className={"icon"}
          />
        )}
        <div>{props?.data?.label}</div>
      </CustomFlexWrapper>
    </SingleValue>
  );
};

export default SelectValue;
