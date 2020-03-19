import { createStore } from 'redux';
import { INITIAL_STATE } from './constants';

function exchange(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FROM_CURRENCY_CHANGE':
    case 'TO_CURRENCY_CHANGE':
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export const store = createStore(exchange);
