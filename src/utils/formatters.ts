/**
 * Utilities and formatters strictly compliant with German standards (de-DE)
 */

export const FREE_SHIPPING_THRESHOLD = 150;
export const STANDARD_SHIPPING_DE = 6.90;
export const EXPRESS_VALOREN_SHIPPING = 19.50;
export const VAT_RATE = 0.19;

/**
 * Formats a number to German currency string, e.g. "1.490,00 €"
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats date into TT.MM.JJJJ (German standard)
 */
export function formatGermanDate(dateInput: string | Date): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Formats date and time into TT.MM.JJJJ, HH:mm Uhr
 */
export function formatGermanDateTime(dateInput: string | Date): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '';
  return `${formatGermanDate(d)}, ${d.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })} Uhr`;
}

/**
 * EU Ring sizes range: 48mm to 66mm (circumference)
 * Corresponding inner diameter in mm: Circumference / Pi
 */
export const RING_SIZES = [48, 50, 52, 54, 56, 58, 60, 62, 64, 66];

export function getDiameterFromCircumference(circumferenceMm: number): string {
  return (circumferenceMm / Math.PI).toFixed(1).replace('.', ',');
}
