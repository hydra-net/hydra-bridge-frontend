/**
 * Converts an hex color string to rgba
 * @param hex - Hex string, eg #1356DE
 * @param alpha - The opacity
 */
export const hex2rgba = (hex: string, alpha = 1): string => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x: string) => parseInt(x, 16));
  if (r && g && b) {
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return "";
};
