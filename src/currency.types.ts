import { CURRENCY_IDS } from './constants';

export interface Currency {
  id: CURRENCY_IDS,
  label: string,
  symbol: string,
}
