import api from './apiConfig';

export const getHashtags = async () => {
  const response = await api.get('/hashtags');
  return response.data;
};

export const getHashtag = async (id: string) => {
  const response = await api.get(`/hashtags/${id}`);
  return response.data;
};

export const editHashtag = async (id: string, data: string) => {
  const response = await api.put(`/hashtags/${id}`, {
    hashtag: { name: data }
  });
  return response.data;
};

export const createHashtag = async (data: string) => {
  const response = await api.post('/hashtags', { hashtag: { name: data } });
  return response.data;
};

export const deleteHashtag = async (id: string) => {
  const response = await api.delete(`/hashtags/${id}`);
  return response.data;
};
