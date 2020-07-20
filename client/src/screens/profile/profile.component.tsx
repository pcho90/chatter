import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import './profile.styles.scss';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { User } from '../../types';
import { UserContext } from '../../contexts/user.context';
import { removeToken } from '../../services/auth';
import { fetchPosts } from '../../services/helpers';
import { getUser, editUser } from '../../services/users';
import { deleteComment } from '../../services/comments';
import { deleteRepost } from '../../services/reposts';
import { deletePost } from '../../services/posts';
import PostList from '../../components/post-list/post-list.component';
import FollowButton from '../../components/follow-button/follow-button.component';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any>([]);
  const [editing, setEditing] = useState(false);
  const { user: currentUser, setUser: setCurrentUser } = useContext(
    UserContext
  );
  const [subtitle, setSubtitle] = useState('');
  const { goBack, push } = useHistory();
  const { username } = useParams();

  const fetchUser = async () => {
    const response = await getUser(username);
    setUser(response);

    const repostsData = response.reposts.map((each: any) => ({
      ...each.post,
      repost: true,
      repost_by: each.user.username,
      created_at: each.created_at,
      id: each.id,
      post_id: each.post_id,
      comment_id: each.comment_id
    }));

    setPosts([...response.posts, ...repostsData]);
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

  const handleDelete = async (id: number, type: number) => {
    if (type === 1) {
      await deletePost(id);
    } else if (type === 2) {
      await deleteRepost(id);
    } else {
      await deleteComment(id);
    }
    fetchUser();
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

  const handleLogout = () => {
    setCurrentUser(null);
    removeToken();
    push('/');
  };

  return (
    <>
      {user && (
        <div className='profile'>
          <header className='profile-nav'>
            <BackIcon className='icon back-button' onClick={handleBack} />
            <div className='header-title'>
              <span>{user.name}</span>
              <label>{user.posts.length} chirps</label>
            </div>
            {user.username === currentUser.username && (
              <div className='profile-logout'>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
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
                <Link to={`/users/${user.username}/following`}>
                  {user.following.length} <span>Following</span>
                </Link>
                <Link to={`/users/${user.username}/followers`}>
                  {user.followers.length} <span>Followers</span>
                </Link>
              </div>
            </div>
            {editing && (
              <div className='editing'>
                <form onSubmit={handleEdit}>
                  <input
                    onChange={handleSubtitleChange}
                    value={subtitle}
                    placeholder='Tell us about yourself.'
                  />
                  <button>Edit</button>
                </form>
              </div>
            )}
            <PostList {...{ posts, handleDelete, user: null }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
