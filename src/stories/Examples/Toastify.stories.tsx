import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { toast } from "react-toastify";
import { ReactComponent } from "*.svg";

import { ToastContentTransactionHash } from "../../common/components/Atoms/ToastContent/ToastContent";

import { DEFAULT_NOTIFY_CONFIG } from "../../common/constants";

export default {
  title: "Vendors/Toastify",
} as ComponentMeta<typeof ReactComponent>;

// we do no want to create a component just to trigger a click
const Template: ComponentStory<typeof ReactComponent> = (args: any) => (
  <button onClick={() => args.callback()}>Trigger notification</button>
);

export const Info = Template.bind({});
Info.args = {
  // @ts-ignore
  callback: () => toast.info("Lorem Ipsum", DEFAULT_NOTIFY_CONFIG),
};

export const Error = Template.bind({});
Error.args = {
  // @ts-ignore
  callback: () => toast.error("Lorem Ipsum", DEFAULT_NOTIFY_CONFIG),
};

export const Success = Template.bind({});
Success.args = {
  // @ts-ignore
  callback: () => toast.success("Lorem Ipsum", DEFAULT_NOTIFY_CONFIG),
};

export const TransactionHash = Template.bind({});
const txHash =
  "0x2e6b1426732aeb5f9ea4e7c0b8cdb66530b0030f4f4b44ed589eb04689b93d48;";
const txUrl =
  "https://etherscan.io/tx/0x2e6b1426732aeb5f9ea4e7c0b8cdb66530b0030f4f4b44ed589eb04689b93d48";
TransactionHash.args = {
  // @ts-ignore
  callback: () =>
    toast.info(<ToastContentTransactionHash txHash={txHash} txUrl={txUrl} />, {
      ...DEFAULT_NOTIFY_CONFIG,
      autoClose: false,
    }),
};
