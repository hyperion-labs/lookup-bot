/* Variables ==================================================================== */
// libraries
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// custom
import App from './components/App';

/* App ==================================================================== */
// redux
const store = createStore(() => [], {}, applyMiddleware());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);