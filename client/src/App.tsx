import React from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Nav from './components/nav/nav.component';
import Home from './screens/home/home.component';
import Register from './screens/register/register.component';
import Login from './screens/login/login.component';
import Post from './screens/post/post.component';

const App = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='body'>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/posts/:id' component={Post} />
      </div>
    </div>
  );
};

export default App;
