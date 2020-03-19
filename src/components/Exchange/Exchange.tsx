import React from "react";
import { CurrencyInput, ExchangeRate } from '..';
import { Currency } from '../../currency.types';

export interface ExchangeProps {
  currencies: {
    [propName: string]: Currency
  }
}

export function Exchange(props: ExchangeProps) {
  const { currencies } = props;
  const [baseCurrency, setBaseCurrency] = React.useState(currencies.eur);
  const [targetCurrency, setTargetCurrency] = React.useState(currencies.usd);

  return (
    <div>
      <CurrencyInput currency={baseCurrency} balance={1234} value={0} onChange={console.log} />
      <ExchangeRate base={baseCurrency} target={targetCurrency} rate={1.2} />
      <CurrencyInput currency={targetCurrency} balance={234} value={1234} onChange={console.log} />
      <button>Exchange</button>
    </div>
  );
};
