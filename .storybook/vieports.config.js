import { sizes } from "../src/media";

export const storyBookViewports = {
  xs: {
    name: "xs",
    styles: {
      width: `${sizes.xs}px`,
      height: "812px",
    },
  },
  sm: {
    name: "sm",
    styles: {
      width: `${sizes.sm}px`,
      height: "801px",
    },
  },
  md: {
    name: "md",
    styles: {
      width: `${sizes.md}px`,
      height: "1024px",
    },
  },
  lg: {
    name: "lg",
    styles: {
      width: `${sizes.lg}px`,
      height: "1080px",
    },
  },
  xl: {
    name: "xl",
    styles: {
      width: `${sizes.xl}px`,
      height: "1080px",
    },
  },
  "2xl": {
    name: "2xl",
    styles: {
      width: `${sizes["2xl"]}px`,
      height: "1080px",
    },
  },
  "3xl": {
    name: "3xl",
    styles: {
      width: `${sizes["3xl"]}px`,
      height: "1080px",
    },
  },
};
