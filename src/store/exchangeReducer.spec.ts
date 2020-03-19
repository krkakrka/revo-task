import { exchangeReducer } from './exchange.reducer';
import { INITIAL_STATE } from '../constants';

describe('exchangeReducer', () => {
  let exchangeState;
  let ratesState;

  beforeEach(() => {
    exchangeState = INITIAL_STATE.exchange;
    ratesState = {
      ...INITIAL_STATE.rates,
      EURUSD: 2,
      USDEUR: 0.5
    };
  });

  describe('base currency value change', () => {
    it('should update target currency on base currency change', () => {
      const value = 150;
      const expectedValue = value * ratesState.EURUSD;
      const action = { type: 'FROM_CURRENCY_VALUE_CHANGE', payload: { value }};
      const nextState = exchangeReducer(exchangeState, ratesState, action);
      expect(nextState.to.value).toBe(expectedValue);
    });

    it('should ensure minimal values are zero or more', () => {
      const action = { type: 'FROM_CURRENCY_VALUE_CHANGE', payload: { value: -123 }};
      const nextState = exchangeReducer(exchangeState, ratesState, action);
      expect(nextState.to.value).toBe(0);
    });
  });

  describe('target currency value change', () => {
    it('should update base currency on target currency change', () => {
      const value = 300;
      const expectedValue = value * ratesState.USDEUR;
      const action = { type: 'TO_CURRENCY_VALUE_CHANGE', payload: { value }};
      const nextState = exchangeReducer(exchangeState, ratesState, action);
      expect(nextState.from.value).toBe(expectedValue);
    });

    it('should ensure minimal values are zero or more', () => {
      const action = { type: 'TO_CURRENCY_VALUE_CHANGE', payload: { value: -123 }};
      const nextState = exchangeReducer(exchangeState, ratesState, action);
      expect(nextState.from.value).toBe(0);
    });
  });

  describe('exchange', () => {
    it('should reset values to zero', () => {
      const action = { type: 'EXCHANGE' };
      const nextState = exchangeReducer(exchangeState, ratesState, action);
      expect(nextState.from.value).toBe(0);
      expect(nextState.to.value).toBe(0);
    })
  });

  describe('base currency id change', () => {
    describe('when new base currency matches target currency', () => {
      let action;
      let nextState;
      beforeAll(() => {
        action = { type: 'FROM_CURRENCY_ID_CHANGE', payload: { currencyId: 'USD' }};
        nextState = exchangeReducer(exchangeState, ratesState, action);
      });

      it('should switch currencies in places', () => {
        expect(nextState.from.currency).toBe(exchangeState.to.currency);
        expect(nextState.to.currency).toBe(exchangeState.from.currency);
      });
      it('should NOT change base currencies value', () => {
        expect(nextState.from.value).toBe(exchangeState.from.value);
      });
      it('should recalculate target currencies value', () => {
        const pair = nextState.from.currency + nextState.to.currency;
        expect(nextState.to.value).toBe(exchangeState.from.value * ratesState[pair]);
      });
    });

    describe('when new base currency does NOT match target currency', () => {
      let action;
      let nextState;
      const newBaseCurrency = 'GBP';
      beforeAll(() => {
        action = { type: 'FROM_CURRENCY_ID_CHANGE', payload: { currencyId: newBaseCurrency }};
        nextState = exchangeReducer(exchangeState, ratesState, action);
      });

      it('should update the base currency', () => {
        expect(nextState.from.currency).toBe(newBaseCurrency);
      });
      it('should NOT update the target currency', () => {
        expect(nextState.to.currency).toBe(exchangeState.to.currency);
      });
      it('should NOT change base currencies value', () => {
        expect(nextState.from.value).toBe(exchangeState.from.value);
      });
      it('should recalculate target currencies value', () => {
        const pair = nextState.from.currency + nextState.to.currency;
        expect(nextState.to.value).toBe(exchangeState.from.value * ratesState[pair]);
      });
    });

    describe('target currency id change', () => {
      describe('when new target currency matches base currency', () => {
        let action;
        let nextState;
        beforeAll(() => {
          action = { type: 'TO_CURRENCY_ID_CHANGE', payload: { currencyId: 'EUR' }};
          nextState = exchangeReducer(exchangeState, ratesState, action);
        });
  
        it('should switch currencies in places', () => {
          expect(nextState.from.currency).toBe(exchangeState.to.currency);
          expect(nextState.to.currency).toBe(exchangeState.from.currency);
        });
        it('should NOT change base currencies value', () => {
          expect(nextState.from.value).toBe(exchangeState.from.value);
        });
        it('should recalculate target currencies value', () => {
          const pair = nextState.from.currency + nextState.to.currency;
          expect(nextState.to.value).toBe(exchangeState.from.value * ratesState[pair]);
        });
      });
  
      describe('when new target currency does NOT match base currency', () => {
        let action;
        let nextState;
        const newTargetCurrency = 'GBP';
        beforeAll(() => {
          action = { type: 'FROM_CURRENCY_ID_CHANGE', payload: { currencyId: newTargetCurrency }};
          nextState = exchangeReducer(exchangeState, ratesState, action);
        });
  
        it('should update the base currency', () => {
          expect(nextState.from.currency).toBe(newTargetCurrency);
        });
        it('should NOT update the target currency', () => {
          expect(nextState.to.currency).toBe(exchangeState.to.currency);
        });
        it('should NOT change base currencies value', () => {
          expect(nextState.from.value).toBe(exchangeState.from.value);
        });
        it('should recalculate target currencies value', () => {
          const pair = nextState.from.currency + nextState.to.currency;
          expect(nextState.to.value).toBe(exchangeState.from.value * ratesState[pair]);
        });
      });
    });
  });
});
