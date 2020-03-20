import React from "react";
import { Currency } from '../../exchange/currency.types';
import { getFormatFunc } from '../../exchange/currency.utils';
import styles from './ExchangeRate.css';

export interface ExchangeRateProps {
  base: Currency,
  target: Currency,
  rate: number
}

export function ExchangeRate(props: ExchangeRateProps) {
  const { base, target, rate } = props;
  const baseFormatFunc = getFormatFunc(base);
  const targetFormatFunc = getFormatFunc(target);

  return (
    <div className={styles.container}>
      {`${baseFormatFunc(1)} = ${targetFormatFunc(rate.toFixed(4))}`}
    </div>
  );
}
