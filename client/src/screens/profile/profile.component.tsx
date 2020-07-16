import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './profile.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { getUser } from '../../services/users';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import PostList from '../../components/post-list/post-list.component';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { goBack } = useHistory();
  const { username } = useParams();

  const fetchUser = async () => {
    const response = await getUser(username);
    setUser(response);
    console.log(response);
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = async (id: number, isComment: boolean) => {
    if (isComment) {
      await deleteComment(id);
    } else {
      await deletePost(id);
    }
  };

  return (
    <>
      {user && (
        <div className='profile'>
          <header>
            <BackIcon className='icon back-button' onClick={handleBack} />
            {user.name}
          </header>
          <div className='profile-body'>
            <div className='profile-header'>
              <span className='name'>{user.name}</span>
              <span className='username'>@{user.username}</span>
              <span className='subtitle'>Subtitle</span>
              <div className='followers'>
                1 <span>Following</span>1 <span>Followers</span>
              </div>
            </div>
            <PostList {...{ posts: user.posts, handleDelete }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
