import api from './apiConfig';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const editUser = async (username: string, data: string) => {
  const response = await api.put(`/users/${username}`, {
    user: { subtitle: data, password: '123456' }
  });
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
