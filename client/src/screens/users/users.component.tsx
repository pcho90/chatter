import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import './users.styles.scss';
import { User } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { getUsers } from '../../services/users';
import { getInitials } from '../../services/getInitials';
import FollowButton from '../../components/follow-button/follow-button.component';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(UserContext);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
    console.log(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='users'>
      <header>Users</header>
      <div className='users-body'>
        {users.map((user: User) => (
          <div key={user.id} className='user'>
            <div className='avatar'>{getInitials(user.name)}</div>
            <div className='user-info'>
              <div className='user-info-title'>
                <div className='title-names'>
                  <Link to={`/users/${user.username}`}>
                    <span className='title-name'>{user.name}</span>
                  </Link>
                  <span className='title-username'>{user.username}</span>
                </div>
                <FollowButton {...{ user, currentUser }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
