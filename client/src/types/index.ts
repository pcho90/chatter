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
  repost?: boolean;
  post?: any;
  repost_by?: any;
  users?: any;
  loadPosts?: any;
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
  user: any;
  users?: any;
  loadPosts?: any;
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
  comments?: number | null | undefined;
  user: any;
  setUser: any;
  post: any;
  loadPosts?: any;
}

export interface RepostTypes {
  user_id: number;
  post_id?: number;
  comment_id?: number;
}

export interface NotificationTypes {
  category: string;
  sender_id: number;
  receiver_id: number;
  refers: number;
}

export interface NotificationProps {
  category: string;
  refers: number;
  sender: any;
  receiver: any;
}
