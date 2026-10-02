/**
 * Class name merger and conditional utility
 */
export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Format wallet address to readable shortened hash e.g. 0x1234...5678
 */
export function formatAddress(address: string | null | undefined): string {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format numbers to compact strings (e.g. 1.2k, 3.4M)
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
}

/**
 * Format token values with comma separators
 */
export function formatTokenAmount(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  }).format(amount);
}
