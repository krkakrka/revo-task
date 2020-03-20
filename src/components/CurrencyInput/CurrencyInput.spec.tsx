import { isInputValid } from './CurrencyInput';

describe('input validation', () => {
  it('should validate specific inputs', () => {
    expect(isInputValid('')).toBe(true);
    expect(isInputValid('0')).toBe(true);
    expect(isInputValid('0.')).toBe(true);
    expect(isInputValid('.0')).toBe(false);
    expect(isInputValid('0.0')).toBe(true);
    expect(isInputValid('0.00')).toBe(true);
    expect(isInputValid('00.00')).toBe(true);
    expect(isInputValid('00.000')).toBe(false);
    expect(isInputValid('00.00.')).toBe(false);
    expect(isInputValid('00.00.00')).toBe(false);
  });
});
