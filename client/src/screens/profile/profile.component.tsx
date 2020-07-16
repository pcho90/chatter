import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './profile.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { getUser } from '../../services/users';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import PostList from '../../components/post-list/post-list.component';
import FollowButton from '../../components/follow-button/follow-button.component';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { user: currentUser } = useContext(UserContext);
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
          <header className='profile-nav'>
            <BackIcon className='icon back-button' onClick={handleBack} />
            <div className='header-title'>
              <span>{user.name}</span>
              <label>{user.posts.length} tweets</label>
            </div>
          </header>
          <div className='profile-body'>
            <div className='profile-header'>
              <div className='profile-header-top'>
                <div className='profile-names'>
                  <span className='name'>{user.name}</span>
                  <span className='username'>@{user.username}</span>
                </div>
                <div className='header-buttons'>
                  <FollowButton {...{ user, currentUser }} />
                </div>
              </div>
              <span className='subtitle'>Subtitle</span>
              <div className='followers'>
                {user.following.length} <span>Following</span>
                {user.followers.length} <span>Followers</span>
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
