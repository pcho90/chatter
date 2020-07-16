import React from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Nav from './components/nav/nav.component';
import Home from './screens/home/home.component';
import Register from './screens/register/register.component';
import Login from './screens/login/login.component';
import Post from './screens/post/post.component';
import Users from './screens/users/users.component';
import Messages from './screens/messages/messages.component';
import Profile from './screens/profile/profile.component';

const App = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='body'>
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route path='/messages' component={Messages} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/users/:username' component={Profile} />
        <Route exact path='/posts/:id' component={Post} />
        <Route path='/comments/:subcomment_id' component={Post} />
      </div>
    </div>
  );
};

export default App;
