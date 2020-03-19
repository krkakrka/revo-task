import { Currency } from './currency.types';
import { CURRENCY_IDS } from './constants';

const CURRENCY_TO_FORMAT = {
  [CURRENCY_IDS.EUR]: formatEur,
  [CURRENCY_IDS.USD]: formatUsd,
  [CURRENCY_IDS.GBP]: formatGbp,
  default: formatEur
};

export function formatEur(value: number): string {
  return `${value}€`;
}

export function formatUsd(value: number): string {
  return `${value}$`;
}

export function formatGbp(value: number): string {
  return `£${value}`;
}

export function getFormatFunc(currency: Currency) {
  const formatFunc = CURRENCY_TO_FORMAT[currency.id];
  return formatFunc || CURRENCY_TO_FORMAT['default'];
}

export function min(value: number, minimal: number): number {
  return value < minimal ? minimal : value;
}