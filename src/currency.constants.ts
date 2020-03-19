export const currencies = {
  eur: {
    label: 'EUR',
    symbol: '€',
    format: (value: number) => `${value}€`
  },
  usd: {
    label: 'USD',
    symbol: '$',
    format: (value: number) => `${value}$`
  },
  gbp: {
    label: 'GBP',
    symbol: '£',
    format: (value: number) => `£${value}`
  }
};
