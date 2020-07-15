import api from './apiConfig';

import { Likes } from '../types';

export const getLikes = async () => {
  const response = await api.get('/likes');
  return response.data;
};

export const getLike = async (id: number) => {
  const response = await api.get(`/likes/${id}`);
  return response.data;
};

export const createLike = async (likeData: Likes) => {
  const response = await api.post('/likes', { like: likeData });
  return response.data;
};

export const deleteLike = async (id: number) => {
  const response = await api.delete(`/likes/${id}`);
  return response.data;
};
