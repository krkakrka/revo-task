import { getRates } from './exchangeRate.service';

describe('getRates', () => {
  it('should return rates', async () => {
    const rates = await getRates();
    console.log(rates);
  });
});
