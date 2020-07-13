import React, { useState, createContext } from 'react';

interface User {
  id: number;
  username: string;
  posts: object[];
  comments: object[];
}

interface Context {
  user: User | any;
  setUser: React.Dispatch<any>;
}

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
