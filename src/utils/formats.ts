export function formatNumberToDollars(
  num: number,
  locale: string = "en-US",
  options: Intl.NumberFormatOptions = {}
): string {
  return num.toLocaleString(locale, { ...options });
}
