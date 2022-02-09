import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemes } from "@react-theming/storybook-addon";

import { appViewports } from "./vieports.config";
import { defaultTheme } from "../src/shell/theme/legacyTheme";

import "./storybook.css";

addDecorator(withThemes(ThemeProvider, [defaultTheme]));

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
