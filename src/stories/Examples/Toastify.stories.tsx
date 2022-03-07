import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactComponent } from "*.svg";
import { DEFAULT_NOTIFY_CONFIG } from "../../common/constants";
import { toast } from "react-toastify";

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
