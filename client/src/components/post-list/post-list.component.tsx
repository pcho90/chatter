import React from 'react';
import { useLocation } from 'react-router-dom';

import './post-list.styles.scss';
import convertDate from '../../services/convertDate';
import { PostListProps } from '../../types';
import PostContainer from '../../components/post-container/post-container.component';

const PostList: React.FC<PostListProps> = ({
  posts,
  handleDelete,
  user,
  users
}) => {
  const { pathname } = useLocation();

  return (
    <div className='post-list'>
      {user && user.following && pathname === '/'
        ? [...posts]
            .filter(item =>
              user.following.find((one: any) => one.id === item.user_id)
            )
            .concat(
              [...posts].filter(item =>
                user.following.find((one: any) => one.id === item.repost_id)
              )
            )
            .sort(
              (a: any, b: any) =>
                convertDate(a.created_at).secondsPassed -
                convertDate(b.created_at).secondsPassed
            )
            .map((post: any) => (
              <PostContainer
                key={post.created_at}
                handleDelete={handleDelete}
                users={users}
                {...post}
              />
            ))
        : [...posts]
            .sort(
              (a, b) =>
                convertDate(a.created_at).secondsPassed -
                convertDate(b.created_at).secondsPassed
            )
            .map((post: any) => (
              <PostContainer
                key={post.created_at}
                handleDelete={handleDelete}
                users={users}
                {...post}
              />
            ))}
    </div>
  );
};

export default PostList;
