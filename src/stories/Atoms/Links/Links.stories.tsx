import { ComponentStory } from "@storybook/react";
import React from "react";
import { ExternalLink } from "../../../common/components/Atoms/Links/Link";

export default {
  title: "Atoms/Links",
  components: { ExternalLink },
};

const TemplateExternalLink: ComponentStory<typeof ExternalLink> = (args) => (
  <ExternalLink {...args}>Hello</ExternalLink>
);
export const External = TemplateExternalLink.bind({});
External.args = {
  href: "https://google.com",
  ariaLabel: "Visit google",
};
