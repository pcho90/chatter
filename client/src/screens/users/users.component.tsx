import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';

import './users.styles.scss';
import { UsersContext } from '../../contexts/users.context';
import UserList from '../../components/user-list/user-list.component';

const Users = () => {
  const { users } = useContext(UsersContext);

  return (
    <div className='users'>
      <header>Users</header>
      {users.length < 1 && (
        <div className='loader'>
          <Loader
            type='TailSpin'
            color='#1da1f2'
            height={50}
            width={50}
            timeout={10000}
          />
        </div>
      )}
      <UserList {...{ users }} />
    </div>
  );
};

export default Users;
