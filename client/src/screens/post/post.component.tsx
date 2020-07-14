import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './post.styles.scss';
import { Post as PostType } from '../../types';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { getPost } from '../../services/posts';
import convertDate from '../../services/convertDate';
import ButtonBar from '../../components/button-bar/button-bar.component';

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

  const fetchPost = async () => {
    const response = await getPost(id);
    setPost(response);
  };

  const toggleCommenting = () => {
    setCommenting(!commenting);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className='comments'>
      <header>
        <BackIcon className='icon' />
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
          comments={post.comments.length}
        />
      </div>
    </div>
  );
};

export default Post;
