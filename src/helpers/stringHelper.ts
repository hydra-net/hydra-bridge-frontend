export const isEmpty = (value: string): boolean =>
  typeof value === "undefined" ||
  value === "undefined" ||
  value === "null" ||
  value === null ||
  value === "";

/**
 * Will replace unwanted chars from the value string (only 0-9 and .(dot) authorized)
 * @param value - the string to verify
 * @return the clean string
 */
export const replaceCharsToHaveOnlyDotOrStringInIt = (value: string): string =>
  value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
