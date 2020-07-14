export interface Post {
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
