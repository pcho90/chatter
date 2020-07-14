export interface Post {
  created_at: string;
  username: string;
  name: string;
  content: string;
  id: number;
  comments: object[];
  user_id?: any;
  parent_id?: any;
  subcomments?: any;
}

export interface Comment {
  created_at: string;
  username: string;
  name: string;
  content: string;
  id: number;
  comments: object[];
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
}

export interface User {
  id: number;
  username: string;
  posts: object[];
  comments: object[];
}

export interface Context {
  user: User | any;
  setUser: React.Dispatch<any>;
}

export interface ButtonBarProps {
  toggleCommenting: React.Dispatch<any>;
  comments?: number;
}
