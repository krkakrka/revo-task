import React from "react";
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
  onChange: Function
}

export function CurrencyInput(props: CurrencyInputProps) {
  const { currency, balance, value: storeValue, onChange, onCurrencyChange } = props;
  const currencyFormatFunc = getFormatFunc(currency);
  const [textValue, setTextValue] = React.useState(storeValue || '');
  const [isFocused, setIsFocused] = React.useState(false);

  const validateAndMaybeUpdate = (changeEvent) => {
    const value = changeEvent.target.value;
    if (isInputValid(value)) {
      setTextValue(value);
      onChange(toCents(value));
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
      <div>Balance: {currencyFormatFunc(fromCents(balance))}</div>
    </div>
  );
}
