import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import UserContextProvider from './contexts/user.context';
import UsersContextProvider from './contexts/users.context';
import HashtagsContextProvider from './contexts/hashtags.context';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <UsersContextProvider>
        <HashtagsContextProvider>
          <App />
        </HashtagsContextProvider>
      </UsersContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
