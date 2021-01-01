import api from './apiConfig';

import {Notification} from '../types';

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const getNotification = async (id: number) => {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
};

export const createNotification = async (data: Notification) => {
  const response = await api.post('/notifications', {notification: data});
  return response.data;
};

export const deleteNotification = async (id: number) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
