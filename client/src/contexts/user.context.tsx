import React, { useState, useEffect, createContext } from 'react';

import { User, Context } from '../types';
import { verifyUser } from '../services/auth';

export const UserContext = createContext<Context>({
  user: null,
  setUser: () => {}
});

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkLoggedIn = async () => {
    const user = await verifyUser();
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
