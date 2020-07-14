import api from './apiConfig';

import { CommentData } from '../types';

export const getComments = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getComment = async (id: number, subcomment_id: number) => {
  const response = await api.get(`/posts/${id}/comments/${subcomment_id}`);
  return response.data;
};

export const createComment = async (id: number, commentData: CommentData) => {
  const response = await api.post(`/posts/${id}/comments`, {
    comment: commentData
  });
  return response.data;
};
