import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './home.styles.scss';

import { Post } from '../../types';
import { fetchPosts } from '../../services/helpers';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import { UserContext } from '../../contexts/user.context';
import { createPost } from '../../services/posts';
import { deleteRepost } from '../../services/reposts';
import PostList from '../../components/post-list/post-list.component';
import CustomInput from '../../components/custom-input/custom-input.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const { pathname } = useLocation();

  const loadPosts = async () => {
    const response = await fetchPosts();
    setPosts(response);
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

    setPosts([...posts, { ...post, comments: [] }]);
    setInput('');
  };

  const handleDelete = async (id: number, type: number) => {
    if (type === 1) {
      await deletePost(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deleteComment(id);
    }
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className='home'>
      <header>{pathname === '/' ? 'Home' : 'Explore'}</header>
      {user && (
        <div className='custom-input'>
          <CustomInput {...{ handleSubmit, input, setInput, handleChange }} />
        </div>
      )}
      <PostList {...{ posts, handleDelete, user }} />
    </div>
  );
};

export default Home;
