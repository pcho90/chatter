import React, { useState, useEffect } from 'react';

import './users.styles.scss';
import { getUsers } from '../../services/users';

const Users = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    const response = await getUsers();
    console.log(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='users'>
      <header>Users</header>
      Users go here.
    </div>
  );
};

export default Users;
