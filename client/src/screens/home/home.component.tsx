import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './home.styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Post } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { UsersContext } from '../../contexts/users.context';
import { HashtagsContext } from '../../contexts/hashtags.context';
import { fetchPosts, getInitials } from '../../services/helpers';
import { createHashtag } from '../../services/hashtags';
import { createPostHashtag } from '../../services/post-hashtags';
import { createPost } from '../../services/posts';
import { deletePost } from '../../services/posts';
import { deleteComment } from '../../services/comments';
import { deleteRepost } from '../../services/reposts';
import { createNotification } from '../../services/notifications';
import PostList from '../../components/post-list/post-list.component';
import CustomInput from '../../components/custom-input/custom-input.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const { users } = useContext(UsersContext);
  const { hashtags } = useContext(HashtagsContext);
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

    const response = await createPost({
      user_id: id,
      name,
      username,
      content: input
    });

    const splitInput = input.split(' ');
    const mention = splitInput.find((one: string) => one.startsWith('@'));
    let postTags = splitInput.filter((each: string) => each.startsWith('#'));

    const mentioned: any = users.find(
      (one: any) => mention === `@${one.username}`
    );

    if (mentioned) {
      await createNotification({
        category: 'mention',
        refers: response.id,
        sender_id: id,
        receiver_id: mentioned.id
      });
    }

    if (postTags.length > 0) {
      postTags.forEach(async (tag: string) => {
        const existingHashtag: any = hashtags.find(
          (hashtag: any) => hashtag.name === tag.slice(1)
        );
        if (existingHashtag) {
          const created = await createPostHashtag({
            post_id: response.id,
            hashtag_id: existingHashtag.id
          });
          console.log('existing hashtag');
          console.log(created);
        } else {
          const created = await createHashtag(tag.slice(1));
          await createPostHashtag({
            post_id: response.id,
            hashtag_id: created.id
          });
          console.log('created hashtag');
          console.log(created);
        }
      });
    }

    await loadPosts();
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
          <div className='avatar'>{getInitials(null, user.name)}</div>
          <div className='custom-input-body'>
            <CustomInput {...{ handleSubmit, input, setInput, handleChange }} />
          </div>
        </div>
      )}
      {posts.length < 1 && (
        <div className='loader'>
          <Loader
            type='TailSpin'
            color='#1da1f2'
            height={50}
            width={50}
            timeout={10000}
          />
        </div>
      )}
      <PostList {...{ posts, handleDelete, user, loadPosts }} />
    </div>
  );
};

export default Home;
