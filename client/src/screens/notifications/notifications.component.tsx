import React, { useContext } from 'react';

import './notifications.styles.scss';
import { UserContext } from '../../contexts/user.context';
import Notification from '../../components/notification/notification.component';

const Notifications = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='notifications'>
      <header>Notifications</header>
      {user && (
        <div className='notifications-body'>
          {[...user.notifications].reverse().map((item: any) => (
            <Notification key={item.created_at} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
