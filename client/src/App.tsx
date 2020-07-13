import React from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Nav from './components/nav/nav.component';
import Home from './screens/home/home.component';
import Register from './screens/register/register.component';
import Login from './screens/login/login.component';

const App = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='body'>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </div>
    </div>
  );
};

export default App;
