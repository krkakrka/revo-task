import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { Exchange } from './components';
import { store } from './store';
import { setupRatesPolling } from './exchangeRate.service';

setupRatesPolling();

ReactDOM.render(
  <Provider store={store}>
    <Exchange />
  </Provider>,
  document.getElementById("root")
);
