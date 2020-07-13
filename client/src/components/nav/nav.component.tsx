import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './nav.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as UsersIcon } from '../../assets/users.svg';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';

import { verifyUser, removeToken } from '../../services/auth';
import { UserContext } from '../../contexts/user.context';

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();

  const checkLoggedIn = async () => {
    const user = await verifyUser();
    if (user) {
      setUser(user);
      console.log(user);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeToken();
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className='nav'>
      <Logo className='logo' />
      <Link to='/' className={pathname === '/' ? 'active' : ''}>
        <HomeIcon className='icon' />
        <span>Home</span>
      </Link>
      <Link to='/posts' className={pathname === '/posts' ? 'active' : ''}>
        <ChatIcon className='icon' />
        <span>Posts</span>
      </Link>
      <Link to='/users' className={pathname === '/users' ? 'active' : ''}>
        <UsersIcon className='icon' />
        <span>Users</span>
      </Link>
      <Link to='/register' className={pathname === '/register' ? 'active' : ''}>
        <UserIcon className='icon' />
        <span>Register</span>
      </Link>
      <Link to='/login' className={pathname === '/login' ? 'active' : ''}>
        <UserIcon className='icon' />
        <span>Login</span>
      </Link>
      <Link to='/' onClick={handleLogout}>
        <UserIcon className='icon' />
        <span>Logout</span>
      </Link>
      {user && user.username}
    </div>
  );
};

export default Nav;
