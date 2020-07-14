import api from './apiConfig';

import { PostData } from '../types';

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData: PostData) => {
  const response = await api.post('/posts', { post: postData });
  return response.data;
};
