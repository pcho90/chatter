import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './post.styles.scss';
import { Post as PostType, Comment } from '../../types';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { getPost } from '../../services/posts';
import convertDate from '../../services/convertDate';
import ButtonBar from '../../components/button-bar/button-bar.component';
import PostContainer from '../../components/post-container/post-container.component';

const Post = () => {
  const [post, setPost] = useState<PostType>({
    created_at: '',
    username: '',
    name: '',
    content: '',
    id: 0,
    comments: []
  });
  const { id } = useParams();
  const { formattedTime, formattedDate } = convertDate(post.created_at);
  const [commenting, setCommenting] = useState(false);
  const { goBack } = useHistory();

  const fetchPost = async () => {
    const response = await getPost(id);
    console.log(response);
    setPost(response);
  };

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
        <ButtonBar toggleCommenting={toggleCommenting} />
      </div>
      <div className='comments-body'>
        {post.comments &&
          post.comments.length > 0 &&
          [...post.comments]
            .reverse()
            .map(
              (comment: any, idx) =>
                !comment.parent_id && <PostContainer key={idx} {...comment} />
            )}
      </div>
    </div>
  );
};

export default Post;
