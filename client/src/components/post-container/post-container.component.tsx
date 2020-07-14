import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useHistory } from 'react-router-dom';

import './post-container.styles.scss';
import { UserContext } from '../../contexts/user.context';
import convertDate from '../../services/convertDate';
import { createComment } from '../../services/comments';
import ButtonBar from '../button-bar/button-bar.component';
import { Post } from '../../types';

const PostContainer: React.FC<Post | any> = props => {
  const { user } = useContext(UserContext);
  const {
    name,
    username,
    created_at,
    content,
    id,
    comments,
    subcomments
  } = props;
  const [commenting, setCommenting] = useState(false);
  const [input, setInput] = useState('');
  const { push } = useHistory();

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setInput(value);
  };

  const viewPost = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement) {
      if (props.parent_id || subcomments) {
        push(`/posts/${props.post_id}/comments/${id}`);
      } else {
        push(`/posts/${id}`);
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { id: user_id, username, name } = user;

    let parent_id = 0;
    let post_id = props.id;

    if (props.post_id) {
      post_id = props.post_id;
    }

    if (!comments) {
      parent_id = id;
    }

    const response = await createComment(id, {
      post_id,
      user_id,
      username,
      name,
      content: input,
      parent_id
    });

    console.log(response);
  };

  return (
    <div className='post'>
      <div className='main' onClick={e => viewPost(e)}>
        <div className='details'>
          <span className='name'>{name}</span>
          <span className='username'>@{username}</span>
          <span className='time'>{convertDate(created_at).timePassed}</span>
        </div>
        <div className='content'>{content}</div>
        <ButtonBar
          toggleCommenting={toggleCommenting}
          comments={
            (comments && comments.length) || (subcomments && subcomments.length)
          }
        />
      </div>
      {commenting && (
        <div className='commenting'>
          <TextareaAutosize
            className='comment-text'
            value={input}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Reply</button>
        </div>
      )}
    </div>
  );
};

export default PostContainer;
