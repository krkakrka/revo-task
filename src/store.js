const INITIAL_STATE = {
  balances: {
    eur: 0.00,
    gbp: 0.00,
    usd: 0.00,
  },
  // todo event to update these
  exchangeRates: {
    // https://api.exchangeratesapi.io/latest?base=EUR
    // https://api.exchangeratesapi.io/latest?base=USD (needed for GBP, all else can be derived)
    // todo need function to get reversed rates (or generate them on state, but that's duplicate state. derived state, so fine)
    eurusd: 1,
    usdeur: 1,
    eurgbp: 1,
    gbpeur: 1,
    usdgbp: 1,
    gbpusd: 1,
  },
  exchange: {
    base: {
      amount: 12,
      currency: 'eur'
    },
    target: {
      amount: 1234,
      currency: 'usd'
    }
  }
};

function exchange({ state: INITIAL_STATE, action }) {
  switch(action.type) {
    case 'UPDATE_RATES':
      // update rates and update 'exchange'
      return state;
    default:
      return state;
  }
}
