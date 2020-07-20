import api from './apiConfig';

export const getPostHashtags = async () => {
  const response = await api.get('/post_hashtags');
  return response.data;
};

export const getPostHashtag = async (id: number) => {
  const response = await api.get(`/post_hashtags/${id}`);
  return response.data;
};

export const editPostHashtag = async (id: number, data: any) => {
  const response = await api.put(`/post_hashtags/${id}`, {
    post_hashtag: data
  });
  return response.data;
};

export const createPostHashtag = async (data: any) => {
  const response = await api.post('/post_hashtags', { post_hashtag: data });
  return response.data;
};

export const deletePostHashtag = async (id: number) => {
  const response = await api.delete(`/post_hashtags/${id}`);
  return response.data;
};
