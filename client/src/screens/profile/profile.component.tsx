import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './profile.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { getUser, editUser } from '../../services/users';
import { deleteComment } from '../../services/comments';
import { deletePost } from '../../services/posts';
import PostList from '../../components/post-list/post-list.component';
import FollowButton from '../../components/follow-button/follow-button.component';
import { isLiked } from '../../services/isLiked';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const { user: currentUser } = useContext(UserContext);
  const [subtitle, setSubtitle] = useState('');
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

  useEffect(() => {
    if (user) {
      setSubtitle(user!.subtitle);
    }
  }, [user]);

  const handleDelete = async (id: number, isComment: boolean) => {
    if (isComment) {
      await deleteComment(id);
    } else {
      await deletePost(id);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editUser(user!.username, subtitle);
    setEditing(false);
    setUser({ ...user!, subtitle });
  };

  const handleSubtitleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSubtitle(value);
  };

  const toggleEdit = () => {
    setEditing(!editing);
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
                  {user && currentUser && user.id !== currentUser.id ? (
                    <FollowButton {...{ user, currentUser }} />
                  ) : (
                    <button onClick={toggleEdit}>Edit Profile</button>
                  )}
                </div>
              </div>
              <span className='subtitle'>{user.subtitle}</span>
              <div className='followers'>
                {user.following.length} <span>Following</span>
                {user.followers.length} <span>Followers</span>
              </div>
            </div>
            {editing && (
              <div className='editing'>
                <form onSubmit={handleEdit}>
                  <input onChange={handleSubtitleChange} value={subtitle} />
                  <button>Edit</button>
                </form>
              </div>
            )}
            <PostList {...{ posts: user.posts, handleDelete }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
