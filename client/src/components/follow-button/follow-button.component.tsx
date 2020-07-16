import React, { useState, useEffect } from 'react';

import './follow-button.styles.scss';
import { getFollows, createFollow, deleteFollow } from '../../services/follows';

interface FollowButtonType {
  user: any;
  currentUser: any;
}

const FollowButton: React.FC<FollowButtonType> = ({ user, currentUser }) => {
  const [hover, setHover] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  const handleFollow = async () => {
    const response = await createFollow({
      follower_id: currentUser.id,
      following_id: user!.id
    });
    console.log(response);
    setFollowing(true);
  };

  const handleUnfollow = async () => {
    const follows = await getFollows();
    const follow = follows.find(
      (item: any) =>
        item.follower_id === currentUser.id && item.following_id === user.id
    );
    await deleteFollow(follow.id);
    setFollowing(false);
  };

  useEffect(() => {
    if (
      currentUser &&
      currentUser.following.find((follow: any) => follow.id === user!.id)
    ) {
      setFollowing(true);
      console.log('following');
    }
  }, []);

  return (
    <>
      {following ? (
        <button
          className='custom-button'
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleUnfollow}
        >
          {hover ? 'Unfollow' : 'Following'}
        </button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};

export default FollowButton;
