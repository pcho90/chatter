import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './home.styles.scss';

import { Post } from '../../types';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import { UserContext } from '../../contexts/user.context';
import { createPost, getPosts } from '../../services/posts';
import { getReposts, deleteRepost } from '../../services/reposts';
import PostList from '../../components/post-list/post-list.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const { pathname } = useLocation();

  const fetchPosts = async () => {
    const response = await getPosts();
    const reposts = await getReposts();

    const repostsData = reposts.map((each: any) => ({
      ...each.post,
      repost: true,
      repost_by: each.user.username,
      created_at: each.created_at,
      id: each.id,
      post_id: each.post_id,
      comment_id: each.comment_id,
      repost_id: each.user.id
    }));

    setPosts([...response, ...repostsData]);
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
      await deleteComment(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deletePost(id);
    }
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <header>{pathname === '/' ? 'Home' : 'Explore'}</header>
      {user && (
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            className='textarea'
            value={input}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          <div>
            <button disabled={input.length == 0}>Chirp</button>
          </div>
        </form>
      )}
      <PostList {...{ posts, handleDelete, user }} />
    </div>
  );
};

export default Home;
