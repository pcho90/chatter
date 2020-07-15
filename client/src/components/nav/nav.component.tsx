import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './nav.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ProfileIcon } from '../../assets/profile.svg';

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
      <Link to='/search' className={pathname === '/search' ? 'active' : ''}>
        <SearchIcon className='icon' />
        <span>Search</span>
      </Link>
      <Link
        to='/message'
        className={pathname === '/message' ? 'active message' : 'message'}
      >
        <MessageIcon className='icon' />
        <span>Messages</span>
      </Link>
      {user ? (
        <>
          <Link
            to='/profile'
            className={pathname === '/profile' ? 'active' : ''}
          >
            <ProfileIcon className='icon' />
            <span>Profile</span>
          </Link>
          <Link to='/' onClick={handleLogout}>
            <UserIcon className='icon' />
            <span>Logout</span>
          </Link>
        </>
      ) : (
        <Link to='/login' className={pathname === '/login' ? 'active' : ''}>
          <UserIcon className='icon' />
          <span>Login</span>
        </Link>
      )}
      {user && <div className='user'>{user.username}</div>}
    </div>
  );
};

export default Nav;
