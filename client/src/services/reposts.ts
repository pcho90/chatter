import api from './apiConfig';

import { RepostTypes } from '../types';

export const getReposts = async () => {
  const response = await api.get('/reposts');
  return response.data;
};

export const getRepost = async (id: number) => {
  const response = await api.get(`/reposts/${id}`);
  return response.data;
};

export const editRepost = async (id: number, data: string) => {
  const response = await api.put(`/reposts/${id}`, { repost: data });
  return response.data;
};

export const createRepost = async (data: RepostTypes) => {
  const response = await api.post('/reposts', { repost: data });
  return response.data;
};

export const deleteRepost = async (id: number) => {
  const response = await api.delete(`/reposts/${id}`);
  return response.data;
};
