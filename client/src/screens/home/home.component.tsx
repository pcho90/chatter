import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './home.styles.scss';

import { Post } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { createPost, getPosts } from '../../services/posts';
import ButtonBar from '../../components/button-bar/button-bar.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response);
    console.log(response);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

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
      {posts &&
        posts.map((post: Post, idx) => (
          <Link to={`/posts/${post.id}`} className='post' key={idx}>
            <div className='details'>
              <span className='name'>{post.name}</span>
              <span className='username'>@{post.username}</span>
              <span className='time'>{post.created_at.slice(11, 19)}</span>
            </div>
            <div className='content'>{post.content}</div>
            <ButtonBar />
          </Link>
        ))}
    </div>
  );
};

export default Home;
