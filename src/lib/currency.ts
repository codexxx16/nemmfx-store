import { CurrencyInfo, GeoLocation } from './types';

const CURRENCY_RATES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  ZAR: { code: 'ZAR', symbol: 'R', rate: 18.35 },
  ZWL: { code: 'ZWL', symbol: 'ZWL$', rate: 322.0 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  ZA: 'ZAR',
  ZW: 'ZWL',
  GB: 'GBP',
  IE: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
};

export function getCurrencyForCountry(countryCode: string): CurrencyInfo {
  const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
  return CURRENCY_RATES[currencyCode] || CURRENCY_RATES['USD'];
}

export function formatPrice(
  amountUsd: number,
  currency: CurrencyInfo
): string {
  if (currency.code === 'USD') {
    return `$${amountUsd.toFixed(2)} USD`;
  }
  const converted = amountUsd * currency.rate;
  return `$${amountUsd.toFixed(2)} USD (~${currency.symbol}${converted.toFixed(2)} ${currency.code})`;
}

export function formatLocalPrice(
  amountUsd: number,
  currency: CurrencyInfo
): string {
  const converted = amountUsd * currency.rate;
  return `${currency.symbol}${converted.toFixed(2)} ${currency.code}`;
}

export async function detectUserLocation(): Promise<GeoLocation> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Geolocation failed');
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      country_code: data.country_code || 'US',
      currency: data.currency || 'USD',
    };
  } catch {
    return {
      country: 'Unknown',
      country_code: 'US',
      currency: 'USD',
    };
  }
}

export { CURRENCY_RATES };
