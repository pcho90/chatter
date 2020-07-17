import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './user-list.styles.scss';
import { User } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { getInitials } from '../../services/helpers';
import FollowButton from '../../components/follow-button/follow-button.component';

const UserList = ({ users }: any) => {
  const { user: currentUser } = useContext(UserContext);
  const { push } = useHistory();

  return (
    <div className='users-body'>
      {users &&
        users.map((user: User) => (
          <div
            key={user.id}
            className='user'
            onClick={() => push(`/users/${user.username}`)}
          >
            <div className='avatar'>{getInitials(null, user.name)}</div>
            <div className='user-info'>
              <div className='user-info-title'>
                <div className='title-names'>
                  <Link to={`/users/${user.username}`}>
                    <span className='title-name'>{user.name}</span>
                  </Link>
                  <span className='title-username'>@{user.username}</span>
                </div>
                {user.username !== currentUser.username && (
                  <FollowButton {...{ user, currentUser }} />
                )}
              </div>
              <span className='title-subtitle'>{user.subtitle}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserList;
