import React, { useState, createContext, useEffect } from 'react';
import { getHashtags } from '../services/hashtags';

export const HashtagsContext = createContext<any>({
  hashtags: null,
  setHashtags: () => {}
});

const HashtagsContextProvider: React.FC = ({ children }) => {
  const [hashtags, setHashtags] = useState<any>([]);

  const fetchHashtags = async () => {
    const response = await getHashtags();
    console.log(response);
  };

  useEffect(() => {
    fetchHashtags();
  }, []);

  return (
    <HashtagsContext.Provider value={{ hashtags, setHashtags }}>
      {children}
    </HashtagsContext.Provider>
  );
};

export default HashtagsContextProvider;
