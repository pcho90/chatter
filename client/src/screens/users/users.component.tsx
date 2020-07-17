import React, { useState, useEffect, useContext } from 'react';

import './users.styles.scss';
import { getUsers } from '../../services/users';
import UserList from '../../components/user-list/user-list.component';

const Users = () => {
  const [users, setUsers] = useState([]);

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
      <UserList {...{ users }} />
    </div>
  );
};

export default Users;
