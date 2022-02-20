import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { stakenetTheme } from "../../shell/theme/stakenetTheme";
import BrandSelect from "../../common/components/Molecules/BrandSelect/BrandSelect";
import { SelectOptionType } from "../../common/components/Molecules/BrandSelect/SelectOption";

export default {
  title: "Molecules/BrandSelects/Default",
  component: BrandSelect,
} as ComponentMeta<typeof BrandSelect>;

const Template: ComponentStory<typeof BrandSelect> = (args) => (
  <div style={{ maxWidth: stakenetTheme.maxWidth.lg }}>
    <BrandSelect {...args}>Connect wallet</BrandSelect>
  </div>
);

const options: Array<SelectOptionType> = [
  {
    label: "Label 1",
    value: "1",
  },
  {
    label: "Label 2",
    value: "2",
  },
  {
    label: "Label 3",
    value: "3",
  },
];

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select an asset",
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  placeholder: "Select an asset",
  options: options,
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: "Select an asset",
  value: options[1],
  options: options,
};

export const WithOptionsAndAllowDisabled = Template.bind({});
const disabledOption = { label: "Im disabled", value: "323", isDisabled: true };
WithOptionsAndAllowDisabled.args = {
  placeholder: "Select an asset",
  options: [...options, disabledOption],
};

export const WithIconsOptions = Template.bind({});
const optionsWithIcons = options.map((option) => ({
  ...option,
  iconName: "usdc",
}));
WithIconsOptions.args = {
  placeholder: "Select an asset",
  options: optionsWithIcons,
};
