import React from 'react';

import './button-bar.styles.scss';
import { ButtonBarProps } from '../../types';
import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as FilledHeartIcon } from '../../assets/heart-filled.svg';

const ButtonBar: React.FC<ButtonBarProps> = ({
  toggleCommenting,
  handleLike,
  comments,
  heartFilled,
  handleRepost
}) => (
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

export default ButtonBar;
