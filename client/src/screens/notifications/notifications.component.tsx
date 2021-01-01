import React, { useContext } from 'react';

import './notifications.styles.scss';
import {User} from '../../types';
import { UserContext } from '../../contexts/user.context';
import Notification from '../../components/notification/notification.component';

interface UserContext {
  user: User
}

const Notifications = () => {
  const { user } = useContext(UserContext) as UserContext;
  return (
    <div className='notifications'>
      <header>Notifications</header>
      {
        user && user.notifications.length > 0 ? (
          <div className='notifications-body'>
            {
              [...user.notifications].reverse().map(item => { 
                const {created_at, category, refers, sender_id, receiver_id} = item;
                return (
                  <Notification
                    key={created_at}
                    category={category}
                    refers={refers}
                    sender={sender_id}
                    receiver={receiver_id}
                  />
                );
              })
            }
          </div>
        ) : (
          <span className='notifications-notice'>Nothing to see here - yet.</span>
        )
      }
    </div>
  );
};

export default Notifications;
