/**
 * Helper to parse a string to a Number, if the string isn't a valid number, it returns 0
 * @param stringNumber
 * @return the parsed number
 */
export const parseStringToNumber = (stringNumber: string) => {
  if (Number.isNaN(Number(stringNumber))) {
    return 0;
  }
  // an empty string will always generate a 0
  return Number(stringNumber);
};
