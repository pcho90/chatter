import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './follows.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { getUser } from '../../services/users';
import UserList from '../../components/user-list/user-list.component';
import { isReposted } from '../../services/helpers';

const Follows = () => {
  const [user, setUser] = useState<User | any>(null);
  const [users, setUsers] = useState(null);
  const [active, setActive] = useState(false);
  const { goBack } = useHistory();
  const { username } = useParams();

  const handleBack = () => {
    goBack();
  };

  const fetchUser = async () => {
    const response = await getUser(username);
    setUser(response);
    setUsers(response.following);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (active) {
        setUsers(user.followers);
      } else {
        setUsers(user.following);
      }
    }
  }, [active]);

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
              onClick={() => setActive(false)}
              className={!active ? `active` : ``}
            >
              Following
            </span>
            <span
              onClick={() => setActive(true)}
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
