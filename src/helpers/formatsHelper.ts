/**
 * Round a gas fee in a human readable way
 * @param gasFee
 * eg: 0.39979797399225586 => 0.40
 */
export const formatGasFees = (gasFee?: number): number =>
  Number(gasFee ? (Math.round(gasFee * 100) / 100).toFixed(2) : 0);

/**
 * Returns in MM the time needed for the transaction
 * @param serviceTime
 */
export const formatServiceTime = (serviceTime: number) => serviceTime / 60;
