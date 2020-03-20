import React, { ChangeEvent } from "react";
import { Currency } from '../../exchange/currency.types';
import { getFormatFunc } from '../../exchange/currency.utils';
import styles from './CurrencyInput.css';

export function isInputValid(input: string) {
  if (input.length === 0) return true;
  if (!input.includes('.')) {
    const regex = /^[0-9]+$/g;
    return regex.test(input);
  } else {
    const regex = /^[0-9]+\.[0-9]{0,2}$/g;
    return regex.test(input);
  }
}

function fromCents(cents: number): string {
  return String(cents / 100);
}

function toCents(textValue: string): number {
  return Math.round(Number(textValue) * 100);
}

export interface CurrencyInputProps {
  currency: Currency,
  balance: number,
  value: number,
  onChange: Function,
  onCurrencyChange: Function
}

export function CurrencyInput(props: CurrencyInputProps) {
  const { currency, balance, value: storeValue, onChange, onCurrencyChange } = props;
  const currencyFormatFunc = getFormatFunc(currency);
  const [textValue, setTextValue] = React.useState(storeValue || '');
  const [isFocused, setIsFocused] = React.useState(false);

  const validateAndMaybeUpdate = (changeEvent: ChangeEvent) => {
    const value = (changeEvent.target as HTMLInputElement).value;
    if (isInputValid(value)) {
      setTextValue(value);
      onChange(toCents(value));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.currencyAndInput}>
        <select
          className={styles.select}
          value={currency.id}
          onChange={e => onCurrencyChange(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>

        <input
          className={styles.currencyInput}
          type="text"
          placeholder="0"
          value={isFocused ? textValue : fromCents(storeValue)}
          onChange={e => validateAndMaybeUpdate(e)}
          onFocus={() => {
            setTextValue(fromCents(storeValue));
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <div className={styles.balance}>Balance: {currencyFormatFunc(fromCents(balance))}</div>
    </div>
  );
}
