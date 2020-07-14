export interface Post {
  created_at: string;
  username: string;
  name: string;
  content: string;
  id: number;
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
