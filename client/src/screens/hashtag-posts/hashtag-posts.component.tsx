import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './hashtag-posts.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { getHashtag } from '../../services/hashtags';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { deletePost } from '../../services/posts';
import { deleteComment } from '../../services/comments';
import { deleteRepost } from '../../services/reposts';
import PostList from '../../components/post-list/post-list.component';

const HashtagPosts = () => {
  const { user } = useContext(UserContext);
  const [hashtag, setHashtag] = useState([]);
  const { goBack } = useHistory();
  const { category } = useParams();

  const fetchHashtag = async () => {
    const response = await getHashtag(category);
    setHashtag(response.posts);
  };

  const handleDelete = async (id: number, type: number) => {
    if (type === 1) {
      await deletePost(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deleteComment(id);
    }
    fetchHashtag();
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    fetchHashtag();
  }, []);

  return (
    <div className='hashtag-posts'>
      <header className='hashtag-header'>
        <BackIcon className='icon back-button' onClick={handleBack} />
        <div className='header-title'>
          <span>#{category}</span>
          <label>{hashtag.length} chirps</label>
        </div>
      </header>
      <div className='hashtag-body'>
        <PostList
          {...{ posts: hashtag, handleDelete, user, loadPosts: fetchHashtag }}
        />
      </div>
    </div>
  );
};

export default HashtagPosts;
