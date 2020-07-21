import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './trending.styles.scss';
import { HashtagsContext } from '../../contexts/hashtags.context';

const Trending = () => {
  const { hashtags } = useContext(HashtagsContext);
  return (
    <div className='trending'>
      <header>Trending</header>
      <div className='trending-body'>
        {[...hashtags]
          .sort((a, b) => b.length - a.length)
          .map((hashtag: any) => (
            <Link to={`/trending/${hashtag.name}`} className='hashtag'>
              <div className='hashtag-name'>#{hashtag.name}</div>
              <div className='hashtag-count'>{hashtag.posts.length} chirps</div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Trending;
