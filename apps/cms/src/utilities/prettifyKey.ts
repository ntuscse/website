/*
Convert a camelCase string to a human - readable format with proper spacing and capitalization
*/

export function prettifyKey(str: string): string {
  let res = str.replace(/([A-Z])/g, ' $1'); // Add a space before each uppercase letter
  res = res.charAt(0).toUpperCase() + res.slice(1); // Capitalize the first letter
  return res;
}