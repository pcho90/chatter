import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import './post.styles.scss';
import { Post as PostType } from '../../types';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { UserContext } from '../../contexts/user.context';
import { getUsers } from '../../services/users';
import { getPost, deletePost } from '../../services/posts';
import { deleteRepost } from '../../services/reposts';
import {
  createComment,
  getComment,
  deleteComment
} from '../../services/comments';
import convertDate from '../../services/convertDate';
import ButtonBar from '../../components/button-bar/button-bar.component';
import PostContainer from '../../components/post-container/post-container.component';
import { getInitials, taggedContent } from '../../services/helpers';
import { createNotification } from '../../services/notifications';
import CustomInput from '../../components/custom-input/custom-input.component';

const Post = () => {
  const [post, setPost] = useState<PostType>({
    created_at: '',
    username: '',
    name: '',
    user_id: 0,
    content: '',
    id: 0,
    comments: [],
    subcomments: []
  });
  const { id, subcomment_id } = useParams();
  const { formattedTime, formattedDate } = convertDate(post.created_at);
  const { pathname } = useLocation();
  const { goBack } = useHistory();
  const { user, setUser } = useContext(UserContext);
  const initials = getInitials(post, '');
  const [commenting, setCommenting] = useState(false);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  const fetchPost = async () => {
    let response;

    if (subcomment_id) {
      response = await getComment(subcomment_id);
    } else {
      response = await getPost(id);
    }

    setPost(response);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  const handleDelete = async (id: number, type: number) => {
    if (type === 1) {
      await deletePost(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deleteComment(id);
    }
    fetchPost();
  };

  const handleBack = () => {
    goBack();
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setInput(value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    let parent_id, post_id;

    if (post.comments) {
      parent_id = 0;
      post_id = id;
    } else {
      parent_id = post.id;
      post_id = 0;
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

    let category;
    if (post.comments) {
      category = 'comment';
    } else {
      category = 'subcomment';
    }

    const splitInput = input.split(' ');
    const mention = splitInput.find((one: string) => one.startsWith('@'));
    const mentioned: any = users.find((one: any) =>
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

    const notification = await createNotification({
      category,
      refers: post_id,
      sender_id: user.id,
      receiver_id: post.user_id!
    });

    console.log(notification);

    if (post.comments) {
      setPost({ ...post, comments: [...post.comments, response] });
    } else {
      setPost({ ...post, subcomments: [...post.subcomments, response] });
    }

    setInput('');
    setCommenting(false);
  };

  useEffect(() => {
    fetchPost();
    fetchUsers();
  }, [pathname]);

  return (
    <div className='comments'>
      <header>
        <BackIcon className='icon back-button' onClick={handleBack} />
        Post
      </header>
      <div className='post-head'>
        <div className='post-head-header'>
          <div className='avatar'>{initials}</div>
          <div className='titles'>
            <span className='name'>{post.name}</span>
            <span className='username'>@{post.username}</span>
          </div>
        </div>
        <div className='reply-to'>
          {post.subcomments && `Replying to @` + post.reply_to}
        </div>
        <div className='comments-body'>
          {taggedContent(post.content, users)}
        </div>
        <span className='time'>
          {formattedTime} · {formattedDate}
        </span>
        <ButtonBar
          toggleCommenting={toggleCommenting}
          {...{ post, user, setUser }}
        />
      </div>
      {commenting && (
        <div className='commenting'>
          <CustomInput {...{ handleSubmit, input, setInput, handleChange }} />
        </div>
      )}
      <div className='comments-body'>
        {post.comments &&
          post.comments.length > 0 &&
          [...post.comments]
            .sort((a: any, b: any) => +b.id - +a.id)
            .map(
              (comment: any) =>
                !comment.parent_id && (
                  <PostContainer
                    key={comment.id}
                    handleDelete={handleDelete}
                    users={users}
                    {...comment}
                  />
                )
            )}
        {post.subcomments &&
          [...post.subcomments]
            .sort((a: any, b: any) => +b.id - +a.id)
            .map((comment: any) => (
              <PostContainer
                key={comment.id}
                handleDelete={handleDelete}
                users={users}
                {...comment}
              />
            ))}
      </div>
    </div>
  );
};

export default Post;
