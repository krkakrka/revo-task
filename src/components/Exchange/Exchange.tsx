import React from "react";
import { connect } from 'react-redux';
import { CurrencyInput, ExchangeRate } from '..';
import { Currency } from '../../currency.types';
import { CURRENCIES, CURRENCY_IDS } from '../../constants';

export interface ExchangeProps {
  // todo any
  exchange: any,
  balances: any,
  rates: any,
  onFromCurrencyChange: any,
  onToCurrencyChange: any
}

function Exchange(props: ExchangeProps) {
  const {
    exchange,
    balances,
    rates,
    onFromCurrencyChange,
    onToCurrencyChange
  } = props;
  const baseCurrency = CURRENCIES[exchange.from.currency];
  const targetCurrency = CURRENCIES[exchange.to.currency];
  const pair = baseCurrency.id + targetCurrency.id;
  const rate = rates[pair];

  return (
    <div>
      <CurrencyInput
        currency={baseCurrency}
        balance={balances[baseCurrency.id]}
        value={exchange.from.value}
        onChange={onFromCurrencyChange}
      />
      <ExchangeRate
        base={baseCurrency}
        target={targetCurrency}
        rate={rate}
      />
      <CurrencyInput
        currency={targetCurrency}
        balance={balances[targetCurrency.id]}
        value={exchange.to.value}
        onChange={onToCurrencyChange}
      />
      <button>Exchange</button>
    </div>
  );
};

// todo any
function mapStateToProps(state: any) {
  return {
    balances: state.balances,
    exchange: state.exchange,
    rates: state.rates
  };
}

// todo any
function mapDispatchToProps(dispatch: any) {
  return {
    // todo consts/types, action creators
    onFromCurrencyChange: (value: number) => dispatch({ type: 'FROM_CURRENCY_CHANGE', payload: { value } }),
    onToCurrencyChange: (value: number) => dispatch({ type: 'TO_CURRENCY_CHANGE', payload: { value } })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);
