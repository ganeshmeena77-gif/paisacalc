/**
 * Indian number formatting utilities.
 * en-IN locale natively groups digits as 1,00,000 (lakh/crore style).
 */

export function formatINR(value: number, decimals = 0): string {
  if (!isFinite(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  if (!isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Compact form like ₹12.50 L or ₹1.25 Cr — useful for big headline numbers. */
export function formatCompactINR(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e7) return `₹${formatNumber(value / 1e7, 2)} Cr`;
  if (abs >= 1e5) return `₹${formatNumber(value / 1e5, 2)} L`;
  if (abs >= 1e3) return `₹${formatNumber(value / 1e3, 2)} K`;
  return formatINR(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)}%`;
}
