export const isLiked = (user: any, id: number) => {
  let liked = false;
  let like: any;

  if (user && user.likes) {
    like = user.likes.find(
      (one: any) => one.post_id === id || one.comment_id === id
    );
    if (like) {
      liked = true;
    } else {
      liked = false;
    }
  }

  return { liked, like };
};
