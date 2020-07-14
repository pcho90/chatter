import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './home.styles.scss';

import { Post } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { createPost, getPosts } from '../../services/posts';
import PostContainer from '../../components/post-container/post-container.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response);
    console.log(response);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;

    setInput(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, name, username } = user;

    const post = await createPost({
      user_id: id,
      name,
      username,
      content: input
    });

    setPosts([...posts, post]);
    setInput('');

    console.log(post);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <header>Home</header>
      {user && (
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            className='textarea'
            value={input}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          <div>
            <button>Chirp</button>
          </div>
        </form>
      )}
      {[...posts].reverse().map((post: Post, idx) => (
        <PostContainer key={idx} {...post} />
      ))}
    </div>
  );
};

export default Home;
