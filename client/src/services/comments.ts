import api from './apiConfig';

import { CommentData } from '../types';

export const getComments = async () => {
  const response = await api.get(`/comments`);
  return response.data;
};

export const getComment = async (subcomment_id: number) => {
  const response = await api.get(`/comments/${subcomment_id}`);
  return response.data;
};

export const createComment = async (commentData: CommentData) => {
  const response = await api.post(`/comments`, {
    comment: commentData
  });
  return response.data;
};
