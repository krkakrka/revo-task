import { createStore } from 'redux';
import { INITIAL_STATE } from './constants';
import { exchangeReducer } from './exchange.reducer';

function exchange(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'RATES_UPDATE':
      return {
        ...state,
        rates: action.payload.rates
      };
    case 'EXCHANGE': {
      return {
        ...state,
        balances: {
          ...state.balances,
          [state.exchange.from.currency]: state.balances[state.exchange.from.currency] - state.exchange.from.value,
          [state.exchange.to.currency]: state.balances[state.exchange.to.currency] + state.exchange.to.value
        },
        exchange: exchangeReducer(state.exchange, state.rates, action)
      };
    }
    default:
      return {
        ...state,
        exchange: exchangeReducer(state.exchange, state.rates, action)
      };
  }
}

export const store = createStore(
  exchange,
  // todo optional
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
