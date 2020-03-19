import { createStore } from 'redux';
import { rootReducer } from './root.reducer';

export const store = createStore(
  rootReducer,
  // todo optional
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
