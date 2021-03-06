import { min } from '../exchange/currency.utils';

// todo any
function exchangeFromTo(exchangeState: any, ratesState: any, fromValue: any): number {
  const pair = exchangeState.from.currency + exchangeState.to.currency;
  const toValue = Math.round(fromValue * ratesState[pair]);
  return toValue;
}

// todo any
function exchangeToFrom(exchangeState: any, ratesState: any, toValue: any): number {
  const pair = exchangeState.to.currency + exchangeState.from.currency;;
  const fromValue = Math.round(toValue * ratesState[pair]);
  return fromValue;
}

// todo any
function switchCurrenciesAndRecalc(exchangeState: any, ratesState: any) {
  const pair = exchangeState.to.currency + exchangeState.from.currency;
  const toValue = Math.round(exchangeState.from.value * ratesState[pair]);

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

// todo any
function changeFromCurrencyAndRecalc(exchangeState: any, ratesState: any, action: any) {
  const pair = action.payload.currencyId + exchangeState.to.currency;
  const value = Math.round(exchangeState.to.value * ratesState[pair]);
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

// todo any
function changeToCurrencyAndRecalc(exchangeState: any, ratesState: any, action: any) {
  const pair = exchangeState.from.currency + action.payload.currencyId;
  const value = Math.round(exchangeState.to.value * ratesState[pair]);
  return {
    from: {
      ...exchangeState.from
    },
    to: {
      ...exchangeState.to,
      currency: action.payload.currencyId,
      value
    }
  };
}

// todo any
export function exchangeReducer(exchangeState: any, ratesState: any, action: any) {
  switch(action.type) {
    case 'FROM_CURRENCY_VALUE_CHANGE':
      const fromValue = Math.round(min(action.payload.value, 0));
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
      const toValue = Math.round(min(action.payload.value, 0));
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
