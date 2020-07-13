import React, { useState, useContext } from 'react';

import './home.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { createPost } from '../../services/posts';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    setInput(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const post = await createPost({
      user_id: user.id,
      username: user.username,
      content: input
    });

    console.log(post);
  };

  return (
    <div className='home'>
      <header>Home</header>
      {user && (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={input}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          <div>
            <button>Post</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Home;
