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
import { createNotification } from '../../services/notifications';

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
    let category;

    if (post.comments) {
      postId = post.id;
      category = 'like post';
    } else {
      commentId = post.id;
      category = 'like comment';
    }

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

      const notification = await createNotification({
        category,
        refers: postId,
        sender_id: user.id,
        receiver_id: post.user_id
      });

      console.log(notification);

      setUser({
        ...user,
        likes: [...user.likes, likeData]
      });
    }
  };

  const handleRepost = async () => {
    let data;
    let postId;

    if (post.repost) {
      postId = post.post_id;
    } else {
      postId = post.id;
    }

    if (!post.repost) {
      if (post.comments) {
        data = { user_id: user.id, post_id: post.id };
      } else {
        data = { user_id: user.id, comment_id: post.id };
      }
    } else {
      data = { user_id: user.id, post_id: post.post_id };
    }
    const response = await createRepost(data);

    let category;
    if (post.comments) {
      category = 'repost post';
    } else {
      category = 'repost comment';
    }

    const notification = await createNotification({
      category,
      refers: postId,
      sender_id: user.id,
      receiver_id: post.user_id
    });

    console.log(notification);
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
