import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemes } from "@react-theming/storybook-addon";

import { appViewports } from "./vieports.config";
import { stakenetTheme } from "../src/shell/theme/stakenetTheme";
import { StakenetGlobalStyle } from "../src/shell/theme/stakenetGlobalStyle";

import "./storybook.css";
import "../src/assets/fonts/index.css";

addDecorator(withThemes(ThemeProvider, [stakenetTheme]));
addDecorator((s) => (
  <>
    <StakenetGlobalStyle />
    {s()}
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  viewport: {
    viewports: appViewports,
    defaultViewport: "xl",
  },
};
