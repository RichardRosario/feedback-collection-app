import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/App';
//for axios testing only
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(thunk));


ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, 
  document.querySelector('#root'));
console.log(store);
  // console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
  // console.log('ENVIRONMENT is', process.env.NODE_ENV)