import React from 'react';
import { Link } from 'react-router-dom';

import {User, Post} from '../types';
import { getPosts } from './posts';
import { getReposts } from './reposts';

interface Repost {
  user: User;
  post: Post;
  created_at: string;
  id: number;
  post_id: number;
  comment_id: number;
}

export const fetchPosts = async () => {
  const response = await getPosts();
  const reposts = await getReposts();

  const repostsData = reposts.map((repost: Repost) => {
    const {user, created_at, id, post_id, comment_id} = repost;

    return {
      ...repost.post,
      repost: true,
      created_at,
      id,
      post_id,
      comment_id,
      repost_id: user.id,
      repost_by: user.username
    };
  });

  return [...response, ...repostsData];
};

export const isLiked = (user: User, id: number) => {
  let liked = false;
  let like: any;

  if (user && user.likes) {
    like = user.likes.find(
      (one: any) => one.post_id === id || one.comment_id === id
    );
    if (like) {
      liked = true;
    }
  }

  return { liked, like };
};

export const isReposted = (user: any, id: number) => {
  let reposted = false;
  let repost: any;

  if (user && user.reposts) {
    repost = user.reposts.find(
      (one: any) => one.post_id === id || one.comment_id === id
    );
    if (repost) {
      reposted = true;
    }
  }

  return { reposted, repost };
};

export const getInitials = (post: Post, name: string) => {
  let initialSplit,
    initials = '?';
  if (name) {
    initialSplit = name.split(' ');
  } else if (post.name) {
    initialSplit = post.name.split(' ');
  }
  if (initialSplit) {
    if (initialSplit[1] && initialSplit[1][0]) {
      initials = initialSplit[0][0] + initialSplit[1][0];
    } else {
      initials = initialSplit[0][0];
    }
  }

  return initials;
};

export const taggedContent = (content: string, users: User[], hashtags: any) => {
  const splitContent: string[] = content.split(' ');
  const tagged = splitContent.filter((word: string) => word.startsWith('@') || word.startsWith('#'));

  if (tagged.length > 0) {
    return (
      <>
        {
          splitContent.map((word: string, index: number) => {
            if (word.startsWith('@')) {
              const taggedUser = users.find(user => `@${user.username}` === word);
              if (taggedUser) {
                return (
                  <Link to={`/users/${taggedUser.username}`}>
                    {index > 0 ? ' ' + word : word}
                  </Link>
                );
              } else {
                return index > 0 ? ' ' + word : word;
              }
            } else if (word.startsWith('#')) {
              const hashtag: any = hashtags.find((one: any) => `#${one.name}` === word);
              if (hashtag) {
                return (
                  <Link to={`/trending/${hashtag.name}`}>
                    {index > 0 ? ' ' + word : word}
                  </Link>
                );
              } else {
                return index > 0 ? ' ' + word : word;
              }
            } else {
              return index > 0 ? ' ' + word : word;
            }
          })
        }
      </>
    );
  }

  return content;
};
