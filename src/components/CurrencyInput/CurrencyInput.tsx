import React from "react";
import { Currency } from '../../currency.types';
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
  const { currency, balance, value, onChange } = props;
  const validateAndMaybeUpdate = (input: string) => {
    if (isInputValid(input)) {
      // todo convert to number?
      onChange(Number(input));
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div>{currency.label}</div>
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
