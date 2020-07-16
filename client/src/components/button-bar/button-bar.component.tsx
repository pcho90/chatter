import React from 'react';

import './button-bar.styles.scss';
import { ButtonBarProps } from '../../types';
import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as FilledHeartIcon } from '../../assets/heart-filled.svg';
import { createRepost } from '../../services/reposts';

const ButtonBar: React.FC<ButtonBarProps> = ({
  toggleCommenting,
  handleLike,
  comments,
  heartFilled,
  post,
  user
}) => {
  const handleRepost = async () => {
    let data;
    if (post.comments) {
      data = { user_id: user.id, post_id: post.id };
    } else {
      data = { user_id: user.id, comment_id: post.id };
    }

    const response = await createRepost(data);
    console.log(response);
  };

  return (
    <div className='buttons'>
      <div className='button-container comment-container'>
        <span className='button-icon comment-button' onClick={toggleCommenting}>
          <CommentIcon className='icon-bar' />
        </span>
        {comments && comments > 0 && comments}
      </div>
      <div className='button-container share-container'>
        <span className='button-icon share-button' onClick={handleRepost}>
          <ShareIcon className='icon-bar' />
        </span>
      </div>
      <div className='button-container heart-container'>
        <span className='button-icon heart-button' onClick={handleLike}>
          {heartFilled ? (
            <FilledHeartIcon className='icon-bar heart-filled' />
          ) : (
            <HeartIcon className='icon-bar' />
          )}
        </span>
      </div>
    </div>
  );
};

export default ButtonBar;
