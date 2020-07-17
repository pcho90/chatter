import React from 'react';

import './button-bar.styles.scss';
import { ButtonBarProps } from '../../types';
import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as FilledHeartIcon } from '../../assets/heart-filled.svg';
import { createLike, deleteLike } from '../../services/likes';
import { isLiked, isReposted } from '../../services/helpers';
import { Likes } from '../../types';
import { createRepost } from '../../services/reposts';

const ButtonBar: React.FC<ButtonBarProps> = ({
  toggleCommenting,
  comments,
  post,
  user,
  setUser
}) => {
  let liked: any, like: any, obj;
  if (post.repost) {
    obj = isLiked(user, post.post_id);
  } else {
    obj = isLiked(user, post.id);
  }
  liked = obj.liked;
  like = obj.like;

  const { reposted } = isReposted(user, post.id);

  const handleLike = async () => {
    let postId = null;
    let commentId = null;
    console.log(post);

    if (post.comments) {
      postId = post.id;
    } else {
      commentId = post.id;
    }
    console.log(postId);
    console.log(commentId);

    if (post.repost) {
      postId = post.post_id;
      commentId = post.comment_id;
    }

    if (liked) {
      await deleteLike(like.id);
      setUser({
        ...user,
        likes: user.likes.filter((item: any) => item.id !== like.id)
      });
    } else {
      const likeData: Likes = {
        user_id: user.id,
        post_id: postId,
        comment_id: commentId
      };
      await createLike(likeData);
      setUser({
        ...user,
        likes: [...user.likes, likeData]
      });
    }
  };

  const handleRepost = async () => {
    let data;
    if (post.comments || post.repost) {
      data = { user_id: user.id, post_id: post.post_id };
    } else {
      data = { user_id: user.id, comment_id: post.post_id };
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
          <ShareIcon className={`icon-bar ${reposted && 'repost'}`} />
        </span>
      </div>
      <div className='button-container heart-container'>
        <span className='button-icon heart-button' onClick={handleLike}>
          {liked ? (
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
