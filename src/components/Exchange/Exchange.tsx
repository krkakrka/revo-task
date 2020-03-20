import React from "react";
import { connect } from 'react-redux';
import { CurrencyInput, ExchangeRate } from '..';
import { Currency } from '../../exchange/currency.types';
import { CURRENCIES, CURRENCY_IDS } from '../../exchange/constants';
import styles from './Exchange.css';

function canExchange(
  baseCurrency: Currency,
  balance: number,
  exchange: { from: Currency, to: Currency }
): boolean {
  return balance < (exchange.from.value || 0) || !exchange.from.value;
}

export interface ExchangeProps {
  // todo any
  exchange: any,
  balances: any,
  rates: any,
  onFromCurrencyValueChange: Function,
  onToCurrencyValueChange: Function,
  onExchangeClick: any,
  onFromCurrencyIdChange: Function,
  onToCurrencyIdChange: Function
}

function Exchange(props: ExchangeProps) {
  const {
    exchange,
    balances,
    rates,
    onFromCurrencyValueChange,
    onToCurrencyValueChange,
    onExchangeClick,
    onFromCurrencyIdChange,
    onToCurrencyIdChange
  } = props;
  const baseCurrency = CURRENCIES[exchange.from.currency];
  const targetCurrency = CURRENCIES[exchange.to.currency];
  const pair = baseCurrency.id + targetCurrency.id;
  const rate = rates[pair];

  return (
    <div className={styles.container}>
      <CurrencyInput
        currency={baseCurrency}
        balance={balances[baseCurrency.id]}
        value={exchange.from.value || 0}
        onChange={onFromCurrencyValueChange}
        onCurrencyChange={onFromCurrencyIdChange}
      />
      <div className={styles.separator}>
        <ExchangeRate
          base={baseCurrency}
          target={targetCurrency}
          rate={rate}
        />
      </div>
      <CurrencyInput
        currency={targetCurrency}
        balance={balances[targetCurrency.id]}
        value={exchange.to.value || 0}
        onChange={onToCurrencyValueChange}
        onCurrencyChange={onToCurrencyIdChange}
      />
      <button
        className={styles.exchangeButton}
        disabled={!canExchange(baseCurrency, balances[baseCurrency.id], exchange)}
        onClick={onExchangeClick}
      >
        Exchange
      </button>
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
    onFromCurrencyValueChange: (value: number) => dispatch({ type: 'FROM_CURRENCY_VALUE_CHANGE', payload: { value } }),
    onToCurrencyValueChange: (value: number) => dispatch({ type: 'TO_CURRENCY_VALUE_CHANGE', payload: { value } }),
    onExchangeClick: () => dispatch({ type: 'EXCHANGE' }),
    onFromCurrencyIdChange: (currencyId: CURRENCY_IDS) => dispatch({ type: 'FROM_CURRENCY_ID_CHANGE', payload: { currencyId }}),
    onToCurrencyIdChange: (currencyId: CURRENCY_IDS) => dispatch({ type: 'TO_CURRENCY_ID_CHANGE', payload: { currencyId }})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);
