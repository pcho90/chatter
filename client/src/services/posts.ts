import api from './apiConfig';

interface PostData {
  user_id: number;
  username: string;
  content: string;
}

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (postData: PostData) => {
  const response = await api.post('/posts', { post: postData });
  return response.data;
};
