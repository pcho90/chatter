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

export const editPost = async (id: number, data: string) => {
  const response = await api.put(`/posts/${id}`, { post: { content: data } });
  return response.data;
};

export const createPost = async (data: PostData) => {
  const response = await api.post('/posts', {
    post: { ...data, repost: false }
  });
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
