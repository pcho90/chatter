import React from 'react';
import { useHistory } from 'react-router-dom';

import './notification.styles.scss';
import { NotificationProps } from '../../types';
import { getInitials } from '../../services/helpers';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as ReplyIcon } from '../../assets/reply.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart-filled.svg';

const Notification: React.FC<NotificationProps> = props => {
  const { category, refers, sender } = props;
  const { push } = useHistory();
  const initials = getInitials(null, sender.name);

  let icon, message, link: any;

  if (category === 'follow') {
    icon = <UserIcon className='icon' />;
    message = ' followed you.';
    link = `/users/${sender.username}`;
  } else if (category === 'subcomment') {
    icon = <ReplyIcon className='icon' />;
    message = ' commented on your reply.';
    link = `/comments/${refers}`;
  } else if (category === 'comment') {
    icon = <ReplyIcon className='icon' />;
    message = ' commented on your post.';
    link = `/posts/${refers}`;
  } else if (category === 'like post') {
    icon = <HeartIcon className='icon' />;
    message = ' liked your post.';
    link = `/posts/${refers}`;
  } else if (category === 'like comment') {
    icon = <HeartIcon className='icon' />;
    message = ' liked your comment.';
    link = `/comments/${refers}`;
  } else if (category === 'repost post') {
    icon = <ReplyIcon className='icon' />;
    message = ' reposted your post.';
    link = `/posts/${refers}`;
  } else {
    icon = <ReplyIcon className='icon' />;
    message = ' reposted your comment.';
    link = `/comments/${refers}`;
  }

  return (
    <div className='notification' onClick={() => push(link)}>
      <div className='notification-icon'>{icon}</div>
      <div className='notification-details'>
        <span className='notification-avatar'>{initials}</span>
        <span className='notification-content'>
          <span>{sender.name}</span>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Notification;
