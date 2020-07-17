export const isLiked = (user: any, id: number) => {
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

export const getInitials = (post: any, name: string) => {
  let initialSplit, initials;
  if (name) {
    initialSplit = name.split(' ');
  } else {
    initialSplit = post.name.split(' ');
  }
  if (initialSplit[1] && initialSplit[1][0]) {
    initials = initialSplit[0][0] + initialSplit[1][0];
  } else {
    initials = initialSplit[0][0];
  }

  return initials;
};
