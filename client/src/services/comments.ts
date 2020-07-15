import api from './apiConfig';

import { CommentData } from '../types';

export const getComments = async () => {
  const response = await api.get(`/comments`);
  return response.data;
};

export const getComment = async (id: number) => {
  const response = await api.get(`/comments/${id}`);
  return response.data;
};

export const createComment = async (data: CommentData) => {
  const response = await api.post(`/comments`, {
    comment: data
  });
  return response.data;
};

export const deleteComment = async (id: number) => {
  const response = await api.delete(`/comments/${id}`);

  return response.data;
};
