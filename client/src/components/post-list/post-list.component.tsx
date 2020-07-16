import React from 'react';

import './post-list.styles.scss';
import { PostListProps } from '../../types';
import PostContainer from '../../components/post-container/post-container.component';

const PostList: React.FC<PostListProps> = ({ posts, handleDelete }) => {
  return (
    <div className='post-list'>
      {[...posts]
        .sort((a, b) => +b.id - +a.id)
        .map((post: any) => (
          <PostContainer key={post.id} handleDelete={handleDelete} {...post} />
        ))}
    </div>
  );
};

export default PostList;
