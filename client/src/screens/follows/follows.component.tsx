import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import './follows.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { getUser } from '../../services/users';
import UserList from '../../components/user-list/user-list.component';

const Follows = () => {
  const [user, setUser] = useState<User | any>(null);
  const [users, setUsers] = useState(null);
  const [active, setActive] = useState(false);
  const { goBack, push } = useHistory();
  const { username } = useParams();
  const { pathname } = useLocation();

  const handleBack = () => {
    goBack();
  };

  const fetchUser = async () => {
    const response = await getUser(username);
    setUser(response);
    if (pathname.includes('followers')) {
      setUsers(response.followers);
      setActive(true);
    } else {
      setUsers(response.following);
      setActive(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='follows'>
      {user && (
        <>
          <header className='follows-header'>
            <BackIcon className='icon back-button' onClick={handleBack} />
            <div className='header-title'>
              <span>{user.name}</span>
              <label>@{user.username}</label>
            </div>
          </header>
          <div className='follows-tabs'>
            <span
              onClick={() => push(`/users/${user.username}/following`)}
              className={!active ? `active` : ``}
            >
              Following
            </span>
            <span
              onClick={() => push(`/users/${user.username}/followers`)}
              className={active ? `active` : ``}
            >
              Followers
            </span>
          </div>
          <UserList users={users} />
        </>
      )}
    </div>
  );
};

export default Follows;
