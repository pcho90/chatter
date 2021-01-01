import React, {useMemo} from 'react';
import {useHistory} from 'react-router-dom';

import './notification.styles.scss';
import {NotificationProps} from '../../types';
import {getInitials} from '../../services/helpers';
import UserIcon from '../../assets/user.svg';
import ReplyIcon from '../../assets/reply.svg';
import HeartIcon from '../../assets/heart-filled.svg';
import AtIcon from '../../assets/at.svg';

interface Category {
  icon: string;
  message: string;
  link: string;
}

const Notification: React.FC<NotificationProps> = props => {
  const {category, refers, sender} = props;
  const {push} = useHistory();

  const categories: {[key: string]: Category} = useMemo(
    () => ({
      follow: {
        icon: UserIcon,
        message: ' followed you.',
        link: `/users/${sender.username}`
      },
      subcomment: {
        icon: ReplyIcon,
        message: ' commented on your reply.',
        link: `/comments/${refers}`
      },
      comment: {
        icon: ReplyIcon,
        message: ' commented on your post.',
        link: `/posts/${refers}`
      },
      'like post': {
        icon: HeartIcon,
        message: ' liked your post.',
        link: `/posts/${refers}`
      },
      'like comment': {
        icon: HeartIcon,
        message: ' liked your comment.',
        link: `/comments/${refers}`
      },
      'repost post': {
        icon: ReplyIcon,
        message: ' reposted your post.',
        link: `/posts/${refers}`
      },
      mention: {
        icon: AtIcon,
        message: ' mentioned you in a post.',
        link: `/posts/${refers}`
      },
      'mention comment': {
        icon: AtIcon,
        message: ' mentioned you in a comment.',
        link: `/comments/${refers}`
      },
      'repost comment': {
        icon: ReplyIcon,
        message: ' reposted your comment.',
        link: `/comments/${refers}`
      }
    }),
    []
  );

  const {icon, message, link} = categories[category];
  const initials = getInitials(null, sender.name);

  return (
    <div className="notification" onClick={() => push(link)}>
      <div className="notification-icon">
        <img src={icon} alt="icon" className="icon" />
      </div>
      <div className="notification-details">
        <span className="notification-avatar">{initials}</span>
        <span className="notification-content">
          <span>{sender.name}</span>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Notification;
