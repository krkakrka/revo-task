import { min } from './currency.utils';

function exchangeToCurrencyPair(exchangeState) {
  return exchangeState.from.currency + exchangeState.to.currency;
}

function exchangeFromTo(exchangeState, ratesState, fromValue): number {
  const pair = exchangeToCurrencyPair(exchangeState);
  const toValue = fromValue * ratesState[pair];
  return toValue;
}

function exchangeToFrom(exchangeState, ratesState, toValue): number {
  const pair = exchangeToCurrencyPair(exchangeState);
  const fromValue = toValue * ratesState[pair];
  return fromValue;
}

function switchCurrenciesAndRecalc(exchangeState, ratesState) {
  const pair = exchangeState.to.currency + exchangeState.from.currency;
  const toValue = exchangeState.from.value * ratesState[pair];

  return {
    from: {
      ...exchangeState.from,
      currency: exchangeState.to.currency
    },
    to: {
      ...exchangeState.to,
      currency: exchangeState.from.currency,
      value: toValue
    }
  };
}

function changeFromCurrencyAndRecalc(exchangeState, ratesState, action) {
  const pair = action.payload.currencyId + exchangeState.to.currency;
  const value = exchangeState.to.value * ratesState[pair];
  return {
    from: {
      ...exchangeState.from,
      currency: action.payload.currencyId
    },
    to: {
      ...exchangeState.to,
      value
    }
  };
}

function changeToCurrencyAndRecalc(exchangeState, ratesState, action) {
  const pair = exchangeState.from.currency + action.payload.currencyId;
  const value = exchangeState.to.value * ratesState[pair];
  return {
    from: {
      ...exchangeState.from,
      value
    },
    to: {
      ...exchangeState.to,
      currency: action.payload.currencyId
    }
  };
}

export function exchangeReducer(exchangeState, ratesState, action) {
  switch(action.type) {
    case 'FROM_CURRENCY_VALUE_CHANGE':
      const fromValue = min(action.payload.value, 0);
      return {
        from: {
          ...exchangeState.from,
          value: fromValue
        },
        to: {
          ...exchangeState.to,
          value: exchangeFromTo(exchangeState, ratesState, fromValue)
        }
      };
    case 'TO_CURRENCY_VALUE_CHANGE':
      const toValue = min(action.payload.value, 0);
      return {
        from: {
          ...exchangeState.from,
          value: exchangeToFrom(exchangeState, ratesState, toValue)
        },
        to: {
          ...exchangeState.to,
          value: toValue
        }
      };
    case 'EXCHANGE':
      return {
        from: {
          ...exchangeState.from,
          value: 0
        },
        to: {
          ...exchangeState.to,
          value: 0
        },
      };
    case 'FROM_CURRENCY_ID_CHANGE':
      if (action.payload.currencyId === exchangeState.to.currency) {
        return switchCurrenciesAndRecalc(exchangeState, ratesState);
      } else {
        return changeFromCurrencyAndRecalc(exchangeState, ratesState, action);
      }
    case 'TO_CURRENCY_ID_CHANGE':
      if (action.payload.currencyId === exchangeState.from.currency) {
        return switchCurrenciesAndRecalc(exchangeState, ratesState);
      } else {
        return changeToCurrencyAndRecalc(exchangeState, ratesState, action);
      }
    default:
      return exchangeState;
  }
}
