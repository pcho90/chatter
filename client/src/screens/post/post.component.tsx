import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './post.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { Post as PostType } from '../../types';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { createLike } from '../../services/likes';
import { getPost } from '../../services/posts';
import { createComment, getComment } from '../../services/comments';
import convertDate from '../../services/convertDate';
import ButtonBar from '../../components/button-bar/button-bar.component';
import PostContainer from '../../components/post-container/post-container.component';

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
  const [commenting, setCommenting] = useState(false);
  const { pathname } = useLocation();
  const { goBack } = useHistory();
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);

  const fetchPost = async () => {
    let response;

    if (subcomment_id) {
      response = await getComment(subcomment_id);
    } else {
      response = await getPost(id);
    }
    console.log(response);
    setPost(response);
  };

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  const handleLike = async () => {
    let postId, commentId;

    if (post.comments) {
      postId = id;
    } else {
      commentId = id;
    }

    const response = await createLike({
      user_id: user.id,
      post_id: postId,
      comment_id: commentId
    });

    console.log(response);
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
    const { user_id, username, name } = post;

    let parent_id, post_id;

    if (post.comments) {
      parent_id = 0;
      post_id = id;
    } else {
      parent_id = post.id;
      post_id = 0;
    }

    const obj = {
      post_id,
      user_id,
      username,
      name,
      content: input,
      parent_id
    };

    console.log(obj);

    const response = await createComment({
      post_id,
      user_id,
      username,
      name,
      content: input,
      parent_id
    });

    if (post.subcomments) {
      setPost({
        ...post,
        subcomments: [...post.subcomments, response]
      });
    } else {
      setPost({
        ...post,
        comments: [...post.comments, response]
      });
    }

    setInput('');
    setCommenting(false);
  };

  useEffect(() => {
    fetchPost();
  }, [pathname]);

  return (
    <div className='comments'>
      <header>
        <BackIcon className='icon back-button' onClick={handleBack} />
        Post
      </header>
      <div className='post-head'>
        <span className='name'>{post.name}</span>
        <span className='username'>@{post.username}</span>
        <div className='comments'>{post.content}</div>
        <span className='time'>
          {formattedTime} · {formattedDate}
        </span>
        <ButtonBar
          toggleCommenting={toggleCommenting}
          handleLike={handleLike}
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

      <div className='comments-body'>
        {post.comments &&
          post.comments.length > 0 &&
          [...post.comments]
            .reverse()
            .map(
              (comment: any, idx) =>
                !comment.parent_id && <PostContainer key={idx} {...comment} />
            )}
        {post.subcomments &&
          [...post.subcomments]
            .reverse()
            .map((comment: any, idx) => (
              <PostContainer key={idx} {...comment} />
            ))}
      </div>
    </div>
  );
};

export default Post;
