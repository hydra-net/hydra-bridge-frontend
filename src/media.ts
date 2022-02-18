/**
 * App viewports sizes declaration
 */
export const sizes = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
};

/**
 * Media queries to be called in styled components
 */
export const devicesUp = {
  xs: `(min-width: ${sizes.xs}px)`,
  sm: `(min-width: ${sizes.sm}px)`,
  md: `(min-width: ${sizes.md}px)`,
  lg: `(min-width: ${sizes.lg}px)`,
  xl: `(min-width: ${sizes.xl}px)`,
  "2xl": `(min-width: ${sizes["2xl"]}px)`,
  "3xl": `(min-width: ${sizes["3xl"]}px)`,
};
