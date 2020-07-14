import React, { useState, createContext } from 'react';

import { User, Context } from '../types';

export const UserContext = createContext<Context>({
  user: null,
  setUser: () => {}
});

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
