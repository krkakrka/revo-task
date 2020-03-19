import React from "react";
import { Currency } from '../../currency.types';
import styles from './ExchangeRate.css';

export interface ExchangeRateProps {
  base: Currency,
  target: Currency,
  rate: number
}

export function ExchangeRate(props: ExchangeRateProps) {
  const { base, target, rate } = props;
  return (
    <div className={styles.container}>
      {`${base.format(1)} = ${target.format(rate)}`}
    </div>
  );
}
