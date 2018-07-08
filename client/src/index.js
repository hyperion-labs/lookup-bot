/* Variables ==================================================================== */
// libraries
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

// custom
import App from './App';
import reducers from './reducers';

/* App ==================================================================== */
// middleware
const middleware = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

// redux
const store = createStore(
  reducers,
  {},
  applyMiddleware(...middleware),
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
