import React from "react";
import { Currency } from '../../exchange/currency.types';
import styles from './CurrencyInput.css';

function isInputValid(input: string) {
  //todo
  return true;
}

export interface CurrencyInputProps {
  currency: Currency,
  balance: number,
  value: number,
  onChange: Function
}

export function CurrencyInput(props: CurrencyInputProps) {
  const { currency, balance, value, onChange, onCurrencyChange } = props;
  const validateAndMaybeUpdate = (input: string) => {
    if (isInputValid(input)) {
      // todo convert to number?
      onChange(Number(input));
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <select value={currency.id} onChange={e => onCurrencyChange(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>

        <input
          type="number"
          placeholder="0"
          value={value}
          onChange={e => validateAndMaybeUpdate(e.target.value)}
        />
      </div>
      <div>Balance: {balance}</div>
    </div>
  );
}
