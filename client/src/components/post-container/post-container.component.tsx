import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './post-container.styles.scss';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { UserContext } from '../../contexts/user.context';
import { createComment, editComment } from '../../services/comments';
import { editPost } from '../../services/posts';
import { getInitials, taggedContent } from '../../services/helpers';
import convertDate from '../../services/convertDate';
import { Post } from '../../types';
import ButtonBar from '../button-bar/button-bar.component';
import { createNotification } from '../../services/notifications';
import CustomInput from '../../components/custom-input/custom-input.component';

const PostContainer: React.FC<Post> = props => {
  const [post, setPost] = useState(props);
  const { user, setUser } = useContext(UserContext);
  const [commenting, setCommenting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState(props.content);
  const [input, setInput] = useState('');
  const initials = getInitials(post, '');
  const { push } = useHistory();

  const {
    name,
    username,
    created_at,
    content,
    id,
    comments,
    subcomments,
    user_id,
    handleDelete,
    post_id,
    reply_to,
    repost,
    repost_by
  } = post;

  const handleEditChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setEdit(value);
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
      console.log(post);
      if (comments) {
        push(`/posts/${id}`);
      } else if (repost) {
        push(`/posts/${post.post_id}`);
      } else {
        push(`/comments/${id}`);
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    let parent_id = 0;
    let post_id = props.id;

    if (props.post_id) {
      post_id = props.post_id;
    }

    if (!comments) {
      parent_id = id;
    }

    const response = await createComment({
      post_id,
      user_id: user.id,
      username: user.username,
      name: user.name,
      content: input,
      parent_id,
      reply_to: post.username
    });

    const splitInput = input.split(' ');
    const mention = splitInput.find((one: string) => one.startsWith('@'));
    const mentioned: any = props.users.find((one: any) =>
      mention?.includes(one.username)
    );

    let notice;
    if (mentioned) {
      notice = await createNotification({
        category: 'mention comment',
        refers: response.id,
        sender_id: user.id,
        receiver_id: mentioned.id
      });
    }
    console.log(notice);

    let category;
    if (post.comments) {
      category = 'comment';
    } else {
      category = 'subcomment';
    }

    const notification = await createNotification({
      category,
      refers: post_id,
      sender_id: user.id,
      receiver_id: user_id!
    });

    console.log(notification);

    setInput('');
    await props.loadPosts();
    setCommenting(false);
  };

  const handleClick = () => {
    console.log(post);
    console.log(post.repost);
    if (post.repost) {
      console.log('repost');
      handleDelete(post.id, 2);
    } else if (post.comments) {
      handleDelete(id, 1);
    } else {
      handleDelete(id, 3);
    }
  };

  const handleEditSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (comments) {
      const response = await editPost(id, edit);
      setEditing(false);
      setPost(response);
    } else {
      const response = await editComment(id, edit);
      setEditing(false);
      setPost(response);
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div className='post'>
      <div className='main' onClick={e => viewPost(e)}>
        <div className={repost ? `repost-info` : `repost-hide`}>
          {repost && (
            <>
              <ShareIcon className='repost-icon' />
              {repost_by} reposted
            </>
          )}
        </div>
        <div className='main-body'>
          <div className='avatar'>{initials}</div>
          <div className='container-body'>
            <div className='details'>
              <Link to={`/users/${username}`}>
                <span className='name'>{name}</span>
              </Link>
              <span className='username'>@{username}</span>
              <span className='time'>
                · {convertDate(created_at).timePassed}
              </span>
              {user && (user.id === user_id || repost_by === user.username) && (
                <span className='edit-buttons'>
                  <EditIcon className='edit-button' onClick={toggleEdit} />
                  <DeleteIcon className='edit-button' onClick={handleClick} />
                </span>
              )}
            </div>
            <div className='reply-to'>
              {subcomments && `Replying to @` + reply_to}
            </div>
            <div className='content'>{taggedContent(content, props.users)}</div>
          </div>
        </div>
        <ButtonBar
          toggleCommenting={toggleCommenting}
          comments={
            (comments && comments.length) || (subcomments && subcomments.length)
          }
          {...{ user, post, setUser }}
          loadPosts={props.loadPosts}
        />
      </div>
      {editing && (
        <div className='commenting'>
          <CustomInput
            handleSubmit={handleEditSubmit}
            handleChange={handleEditChange}
            input={edit}
            setInput={setEdit}
          />
        </div>
      )}
      {commenting && (
        <div className='commenting'>
          <CustomInput {...{ handleSubmit, input, setInput, handleChange }} />
        </div>
      )}
    </div>
  );
};

export default PostContainer;
