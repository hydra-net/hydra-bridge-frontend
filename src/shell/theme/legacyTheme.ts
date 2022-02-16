import { DefaultTheme, LegacyTheme } from "styled-components";

declare module "styled-components" {
  export interface LegacyTheme extends DefaultTheme {
    primaryColor: string;
    secondaryColor: string;

    heading: {
      xxl: string;
      xl: string;
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };

    paragraph: {
      xxl: string;
      xl: string;
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };

    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    backgroundColor: string;
    lightBackgroundColorHover: string;
    inputBackgroundColor: string;
    inputBorderColor: string;
    lightBackgroundColor: string;
    greyColor: string;
    buttonDefaultColor: string;
    greenColor: string;
    blueColor: string;
    redColor: string;
  }
}

export const legacyTheme: LegacyTheme = {
  primaryColor: "#ffffff",
  secondaryColor: "#121212",

  heading: {
    xxl: "5.8rem",
    xl: "4.8rem",
    lg: "3.8rem",
    md: "2.8rem",
    sm: "2.4rem",
    xs: "1.9rem",
  },

  paragraph: {
    xxl: "2.2rem",
    xl: "1.8rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1rem",
  },

  borderRadius: {
    xs: ".3rem",
    sm: ".6rem",
    md: "1rem",
    lg: "2rem",
  },
  backgroundColor: "#1e1e1e",
  lightBackgroundColorHover: "#171717",
  inputBackgroundColor: "rgba(255, 255, 255, 0.05)",
  inputBorderColor: "rgba(255, 255, 255, 0.3)",
  lightBackgroundColor: "#2d2d2d",
  greyColor: "rgb(226, 226, 229)",
  buttonDefaultColor: "rgba(0,0,0,0.2)",
  greenColor: "#37b514",
  blueColor: "#1976d2",
  redColor: "#d32f2f",
};
