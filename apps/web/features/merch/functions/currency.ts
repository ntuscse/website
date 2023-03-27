export const displayPrice = (amountInCents: number): string => {
  const amountStr = amountInCents.toString();
  const dollarStr = amountStr.slice(0, -2).padStart(1, "0");
  const centStr = amountStr.slice(-2).padStart(2, "0");
  const priceStr = dollarStr.concat(".").concat(centStr);
  return `$${priceStr}`;
};
