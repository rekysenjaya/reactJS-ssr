import App from './routes';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('appBody')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    var NewApp = require('./routes').default;
    ReactDOM.render(
      <Provider store={store}>
        <NewApp />
      </Provider>,
      document.getElementById('appBody')
    );
  });
}

