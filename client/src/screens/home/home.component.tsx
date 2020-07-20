import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import InputTrigger from 'react-input-trigger';

import './home.styles.scss';

import { Post } from '../../types';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import { UserContext } from '../../contexts/user.context';
import { getUsers } from '../../services/users';
import { createPost, getPosts } from '../../services/posts';
import { getReposts, deleteRepost } from '../../services/reposts';
import PostList from '../../components/post-list/post-list.component';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [inputMention, setInputMention] = useState<any>({
    currentSelection: 0,
    startPosition: null,
    showSuggestor: false,
    top: null,
    left: null,
    text: ''
  });
  const { pathname } = useLocation();

  const handleKeyDown = (event: any) => {
    const { which } = event;

    if (which === 40) {
      event.preventDefault();
      setInputMention((prev: any) => ({
        ...prev,
        currentSelection: (prev.currentSelection + 1) % users.length
      }));
    } else if (which === 38 && inputMention.currentSelection > 0) {
      event.preventDefault();
      setInputMention((prev: any) => ({
        ...prev,
        currentSelection: (prev.currentSelection - 1) % users.length
      }));
    } else if (which === 13) {
      event.preventDefault();
      const selectedUser: any = users[inputMention.currentSelection];
      const newText = `${input.slice(0, inputMention.startPosition - 1)} @${
        selectedUser.username
      }${input.slice(
        inputMention.startPosition + selectedUser.username.length,
        input.length
      )}`;
      setInput(newText);
      setInputMention({
        currentSelection: 0,
        startPosition: null,
        showSuggestor: false,
        top: null,
        left: null,
        text: ''
      });
    }
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

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
      await deletePost(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deleteComment(id);
    }
    fetchPosts();
  };

  const inputSuggestor = (metaData: any) => {
    const { hookType, cursor } = metaData;

    if (hookType === 'start') {
      setInputMention((prev: any) => ({
        ...prev,
        showSuggestor: true,
        startPosition: cursor.selectionStart,
        left: cursor.left,
        top: cursor.top + 40
      }));
    }

    if (hookType === 'cancel') {
      setInputMention((prev: any) => ({
        ...prev,
        showSuggestor: false,
        startPosition: null,
        left: null,
        top: null,
        text: ''
      }));
    }
  };

  const handleMentionChange = (metaData: any) => {
    setInputMention((prev: any) => ({
      ...prev,
      text: metaData.text
    }));
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  let endHandlerTrigger: any;

  return (
    <div className='home'>
      <header>{pathname === '/' ? 'Home' : 'Explore'}</header>
      {user && (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <InputTrigger
            trigger={{
              keyCode: 50,
              shiftKey: true
            }}
            onStart={(metaData: any) => {
              inputSuggestor(metaData);
            }}
            onCancel={(metaData: any) => {
              inputSuggestor(metaData);
            }}
            onType={(metaData: any) => handleMentionChange(metaData)}
            // endTrigger={(endHandler: any) => {
            //   endHandlerTrigger = endHandler;
            // }}
          >
            <TextareaAutosize
              className='textarea'
              value={input}
              onChange={handleChange}
              placeholder="What's happening?"
            />
          </InputTrigger>
          <div
            id='dropdown'
            style={{
              position: 'absolute',
              width: '200px',
              height: 'auto',
              borderRadius: '6px',
              background: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.4) 0px 1px 4px',
              display: inputMention.showSuggestor ? 'block' : 'none',
              top: inputMention.top!,
              left: inputMention.left!
            }}
          >
            {users
              .filter((user: any) => user.username.includes(inputMention.text))
              .map((user: any, index) => (
                <div
                  style={{
                    padding: '10px 20px',
                    background:
                      index === inputMention.currentSelection ? '#eee' : ''
                  }}
                >
                  {user.username}
                </div>
              ))}
          </div>
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
