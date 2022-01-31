import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
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
    lightBackgroundColorHover: string,
    inputBackgroundColor: string,
    inputBorderColor: string,
    lightBackgroundColor: string,
    greyColor: string
    buttonDefaultColor: string,
    greenColor: string
    blueColor: string;
    redColor: string;
  }
}

export const defaultTheme: DefaultTheme = {
  primaryColor: "#ffffff",
  secondaryColor: "#121212",

  heading: {
    xxl: "58px",
    xl: "48px",
    lg: "38px",
    md: "28px",
    sm: "24px",
    xs: "19px",
  },

  paragraph: {
    xxl: "22px",
    xl: "18px",
    lg: "16px",
    md: "14px",
    sm: "12px",
    xs: "10px",
  },

  borderRadius: {
    xs: "3px",
    sm: "6px",
    md: "10px",
    lg: "20px",
  },
  backgroundColor: "#1e1e1e",
  lightBackgroundColorHover:"#171717",
  inputBackgroundColor: "rgba(255, 255, 255, 0.05)",
  inputBorderColor: "rgba(255, 255, 255, 0.3)",
  lightBackgroundColor: "#2d2d2d",
  greyColor: "rgb(226, 226, 229)",
  buttonDefaultColor: "rgba(0,0,0,0.2)",
  greenColor: "#37b514",
  blueColor: "#1976d2",
  redColor: "#d32f2f"
};
