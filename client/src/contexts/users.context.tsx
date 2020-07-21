import React, { useState, createContext, useEffect } from 'react';
import { getUsers } from '../services/users';

export const UsersContext = createContext<any>({
  users: null,
  setUsers: () => {}
});

const UsersContextProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
