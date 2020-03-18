// todo xml parser
const BASE_EUR_RATES_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
// EUR/USD
// USD/EUR = 1 / EUR/USD
// EUR/GBP
// GBP/EUR = 1 / EUR/GBP
// USD/GBP = EUR/USD / EUR/GBP
// GBP/USD = 1 / USD/GBP

async function getExchangeRates() {
  return {
    eurusd: 1,
    usdeur: 1,
    eurgbp: 1,
    gbpeur: 1,
    usdgbp: 1,
    gbpusd: 1,
  };
}
