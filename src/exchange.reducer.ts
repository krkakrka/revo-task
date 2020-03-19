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

export function exchangeReducer(exchangeState, ratesState, action) {
  switch(action.type) {
    case 'FROM_CURRENCY_CHANGE':
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
    case 'TO_CURRENCY_CHANGE':
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
    case 'EXCHANGE': {
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
    }
    default:
      return exchangeState;
  }
}
