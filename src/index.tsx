import React from "react";
import ReactDOM from "react-dom";
import { Exchange } from './components';
import { currencies } from './currency.constants';

ReactDOM.render(
  <Exchange currencies={currencies} />,
  document.getElementById("root")
);
