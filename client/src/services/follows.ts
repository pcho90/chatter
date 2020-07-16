import api from './apiConfig';

import { FollowsType } from '../types';

export const getFollows = async () => {
  const response = await api.get('/follows');
  return response.data;
};

export const getFollow = async (id: number) => {
  const response = await api.get(`/follows/${id}`);
  return response.data;
};

export const editFollow = async (id: number, data: string) => {
  const response = await api.put(`/follows/${id}`, {
    follows: { content: data }
  });
  return response.data;
};

export const createFollow = async (data: FollowsType) => {
  const response = await api.post('/follows', { follow: data });
  return response.data;
};

export const deleteFollow = async (id: number) => {
  const response = await api.delete(`/follows/${id}`);
  return response.data;
};
