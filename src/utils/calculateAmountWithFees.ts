export const calculateAmountWithFees = (
  amount: number,
  feesPercentage: number
): number =>
  Math.round(((amount * 100) / (100 - feesPercentage)) * 10 ** 6) / 10 ** 6;
