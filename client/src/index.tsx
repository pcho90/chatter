import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import UserContextProvider from './contexts/user.context';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
