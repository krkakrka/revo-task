import { store } from './store/store';

const BASE_EUR_RATES_URL = 'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,GBP';
// todo fix
const TEN_SECONDS_IN_MS = 10 * 10000000;
let pollInterval;

// todo tests?
// {"rates":{"USD":1.0934,"GBP":0.9219},"base":"EUR","date":"2020-03-18"}
function formatRates(rawRates) {
  const EURUSD = rawRates.rates['USD'];
  const USDEUR = 1/EURUSD;
  const EURGBP = rawRates.rates['GBP'];
  const GBPEUR = 1/EURGBP;
  const USDGBP = EURUSD/EURGBP;
  const GBPUSD = 1/USDGBP;

  return {
    EURUSD,
    USDEUR,
    EURGBP,
    GBPEUR,
    USDGBP,
    GBPUSD
  };
}

export async function getRates() {
  const response = await window.fetch(BASE_EUR_RATES_URL);
  if (response.status < 200 || response.status >= 400) {
    throw new Error(`Exchange rate API error: ${response.status}`, response);
  }
  return response.json();
}

async function updateRates() {
  try {
    const rawRates = await getRates();
    const formatedRates = formatRates(rawRates);
    store.dispatch({ type: 'RATES_UPDATE', payload: { rates: formatedRates }});
  } catch (e) {
    console.error(e);
  }
}

export function setupRatesPolling() {
  updateRates();
  pollInterval = window.setInterval(updateRates, TEN_SECONDS_IN_MS);
}

export function disableRatesPolling() {
  window.clearInterval(pollInterval);
}
