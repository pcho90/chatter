export interface User {
  id: number;
  username: string;
  name: string;
  posts: object[];
  comments: object[];
  likes: object[];
  followers: object[];
  following: object[];
  subtitle: string;
}

export interface Post {
  created_at: string;
  username: string;
  name: string;
  content: string;
  id: number;
  comments: object[];
  user_id?: number | null;
  parent_id?: number | null;
  subcomments?: any;
  post_id?: number | null;
  handleDelete?: any;
  reply_to?: string;
}

export interface Comment {
  created_at: string;
  username: string;
  name: string;
  content: string;
  id: number;
  comments: object[];
}

export interface FollowsType {
  follower_id: number;
  following_id: number;
  id?: number;
}

export interface PostListProps {
  posts: any[];
  handleDelete: Function;
}

export interface Likes {
  user_id: number;
  post_id?: number | null;
  comment_id?: number | null;
}

export interface PostData {
  user_id: number;
  username: string;
  name: string;
  content: string;
}

export interface CommentData {
  user_id: number;
  post_id: number;
  username: string;
  name: string;
  content: string;
  parent_id: number;
  reply_to: string;
}

export interface Context {
  user: User | any;
  setUser: React.Dispatch<any>;
}

export interface ButtonBarProps {
  toggleCommenting: React.Dispatch<any>;
  handleLike: any;
  comments?: number | null | undefined;
  heartFilled?: boolean;
  user: any;
  post: any;
}

export interface RepostTypes {
  user_id: number;
  post_id?: number;
  comment_id?: number;
}
