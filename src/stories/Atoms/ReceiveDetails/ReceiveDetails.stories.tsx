import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ReceiveDetails from "../../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import { mockReceiveDetailsProps } from "../../../__mocks__/props/receiveDetails";

export default {
  title: "Atoms/ReceiveDetails/Content",
  component: ReceiveDetails,
} as ComponentMeta<typeof ReceiveDetails>;

const Template: ComponentStory<typeof ReceiveDetails> = (args) => (
  <ReceiveDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...mockReceiveDetailsProps,
};
