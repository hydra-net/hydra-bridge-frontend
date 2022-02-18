/**
 * Regex's
 */

export const getOnlyNumbersAndDecimalNumbersRegex = () =>
  new RegExp(/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/);

/**
 * Patterns
 */

/**
 * Will matches: 0.32 / .32 / 32 / 32. / 32.54
 */
export const getOnlyNumbersAndAllowDotPattern = "^[0-9]*[.]?[0-9]*$";
