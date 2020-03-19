export enum CURRENCY_IDS {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP'
};

export const CURRENCIES = {
  [CURRENCY_IDS.EUR]: {
    id: CURRENCY_IDS.EUR,
    label: 'EUR',
    symbol: '€',
  },
  [CURRENCY_IDS.USD]: {
    id: CURRENCY_IDS.USD,
    label: 'USD',
    symbol: '$',
  },
  [CURRENCY_IDS.GBP]: {
    id: CURRENCY_IDS.GBP,
    label: 'GBP',
    symbol: '£',
  }
};

export const INITIAL_STATE = {
  balances: {
    [CURRENCY_IDS.EUR]: 30.00,
    [CURRENCY_IDS.USD]: 30.00,
    [CURRENCY_IDS.GBP]: 30.00,
  },
  rates: {
    EURUSD: 1,
    USDEUR: 1,
    EURGBP: 1,
    GBPEUR: 1,
    USDGBP: 1,
    GBPUSD: 1,
  },
  exchange: {
    from: {
      currency: CURRENCY_IDS.EUR,
      value: 0
    },
    to: {
      currency: CURRENCY_IDS.USD,
      value: 0
    }
  }
};
