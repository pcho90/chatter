import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useHistory } from 'react-router-dom';

import './post-container.styles.scss';
import { UserContext } from '../../contexts/user.context';
import convertDate from '../../services/convertDate';
import { createComment } from '../../services/comments';
import { createLike, deleteLike } from '../../services/likes';
import ButtonBar from '../button-bar/button-bar.component';
import { Post } from '../../types';

const PostContainer: React.FC<Post | any> = props => {
  const { user, setUser } = useContext(UserContext);
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

  let liked = false;
  let like: any;

  if (user) {
    like = user.likes.find(
      (one: any) => one.post_id === id || one.comment_id === id
    );
    if (like) {
      liked = true;
    } else {
      liked = false;
    }
  }

  const handleLike = async () => {
    let postId = null;
    let commentId = null;

    if (comments) {
      postId = id;
    } else {
      commentId = id;
    }

    if (liked) {
      await deleteLike(like.id);
      setUser({
        ...user,
        likes: user.likes.filter((item: any) => item.id !== like.id)
      });
    } else {
      const likeData = {
        user_id: user.id,
        post_id: postId,
        comment_id: commentId
      };
      await createLike(likeData);
      setUser({
        ...user,
        likes: [...user.likes, likeData]
      });
    }
  };

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setInput(value);
  };

  const viewPost = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement) {
      if (!comments) {
        push(`/comments/${id}`);
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

    await createComment({
      post_id,
      user_id,
      username,
      name,
      content: input,
      parent_id
    });

    setInput('');
    setCommenting(false);
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
          handleLike={handleLike}
          heartFilled={liked}
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
