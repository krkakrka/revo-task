// @ts-nocheck
// todo
import { INITIAL_STATE } from '../exchange/constants';
import { exchangeReducer } from './exchange.reducer';

export function rootReducer(state = INITIAL_STATE, action) {
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
