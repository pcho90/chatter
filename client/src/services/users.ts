import api from './apiConfig';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const editUser = async (id: number, data: string) => {
  const response = await api.put(`/users/${id}`, { post: { content: data } });
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
