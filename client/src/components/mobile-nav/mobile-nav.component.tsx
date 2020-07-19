import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './mobile-nav.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as BellIcon } from '../../assets/bell.svg';
import { ReactComponent as ExploreIcon } from '../../assets/explore.svg';
import { ReactComponent as ProfileIcon } from '../../assets/profile.svg';

const MobileNav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(UserContext);
  return (
    <div className='mobile-nav'>
      <Link to='/' className={pathname === '/' ? 'active' : ''}>
        <HomeIcon className='icon' />
      </Link>
      <Link to='/posts' className={pathname === '/posts' ? 'active' : ''}>
        <ExploreIcon className='icon' />
      </Link>
      {user ? (
        <>
          <Link
            to='/notifications'
            className={pathname === '/notifications' ? 'active' : ''}
          >
            <BellIcon className='icon' />
          </Link>
          <Link
            to={`/users/${user.username}`}
            className={pathname === `/users/${user.username}` ? 'active' : ''}
          >
            <ProfileIcon className='icon' />
          </Link>
        </>
      ) : (
        <Link to='/login' className={pathname === '/login' ? 'active' : ''}>
          <UserIcon className='icon' />
        </Link>
      )}
    </div>
  );
};

export default MobileNav;
