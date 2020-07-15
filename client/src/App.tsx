import React from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Nav from './components/nav/nav.component';
import Home from './screens/home/home.component';
import Posts from './screens/posts/posts.component';
import Register from './screens/register/register.component';
import Login from './screens/login/login.component';
import Post from './screens/post/post.component';
import Users from './screens/users/users.component';

const App = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='body'>
        <Route exact path='/' component={Home} />
        <Route exact path='/posts' component={Posts} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route exact path='/posts/:id' component={Post} />
        <Route path='/comments/:subcomment_id' component={Post} />
        <Route path='/users' component={Users} />
      </div>
    </div>
  );
};

export default App;
