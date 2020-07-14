import React from 'react';

import './button-bar.styles.scss';
import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';

const ButtonBar = () => (
  <div className='buttons'>
    <span className='button-icon comment-button'>
      <CommentIcon className='icon-bar' />
    </span>
    <span className='button-icon share-button'>
      <ShareIcon className='icon-bar' />
    </span>
    <span className='button-icon heart-button'>
      <HeartIcon className='icon-bar' />
    </span>
  </div>
);

export default ButtonBar;
