import React, { useContext } from 'react';

import './notification.styles.scss';
import { UserContext } from '../../contexts/user.context';

const Notifications = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='notifications'>
      <header>Notifications</header>
      {user && (
        <div className='notifications-body'>
          {user.notifications.map((notification: any) => (
            <div>{notification.category}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
