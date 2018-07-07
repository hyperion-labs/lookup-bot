/* Variables ==================================================================== */
// libraries
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// custom
import App from './components/App';
import reducers from './reducers';

/* App ==================================================================== */
// redux
const store = createStore(reducers, {}, applyMiddleware());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
