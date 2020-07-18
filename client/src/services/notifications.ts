import api from './apiConfig';

import { NotificationTypes } from '../types';

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const getNotification = async (id: number) => {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
};

export const createNotification = async (data: NotificationTypes) => {
  const response = await api.post('/notifications', { notification: data });
  return response.data;
};

export const deleteNotification = async (id: number) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
