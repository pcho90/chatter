import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './home.styles.scss';

import { Post } from '../../types';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import { UserContext } from '../../contexts/user.context';
import { createPost, getPosts } from '../../services/posts';
import PostList from '../../components/post-list/post-list.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await getPosts();
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

    console.log(posts);

    setPosts([...posts, { ...post, comments: [] }]);
    setInput('');
  };

  const handleDelete = async (id: number, isComment: boolean) => {
    if (isComment) {
      await deleteComment(id);
    } else {
      await deletePost(id);
    }
    console.log(posts);
    fetchPosts();
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
      <PostList {...{ posts, handleDelete }} />
    </div>
  );
};

export default Home;
