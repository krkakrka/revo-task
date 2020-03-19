export interface FormatFunction {
  (value: number): string
}

export interface Currency {
  label: string,
  symbol: string,
  format: FormatFunction
}
