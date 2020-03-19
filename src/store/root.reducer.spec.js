import { rootReducer } from './root.reducer';
import { INITIAL_STATE } from '../exchange/constants';

describe('exchangeReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...INITIAL_STATE,
      balances: {
        EUR: 1,
        USD: 0
      },
      exchange: {
        from: { currency: 'EUR', value: 1 },
        to: { currency: 'USD', value: 2 }
      }
    }
  });

  it('should update balances of exchange', () => {
    const action = { type: 'EXCHANGE' };
    const nextState = rootReducer(state, action);
    expect(nextState.balances.EUR).toBe(0);
    expect(nextState.balances.USD).toBe(2);
  });
});
