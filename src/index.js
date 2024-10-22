import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import data from '../data';

import App from './components/App.jsx';
import store from './reducers/index.js';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App data={data} />
      </BrowserRouter>
    </Provider>
);