import api from './apiConfig';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (loginData: LoginData) => {
  const resp = await api.post('/auth/login', { authentication: loginData });
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
};

export const registerUser = async (registerData: RegisterData) => {
  const resp = await api.post('/users/', { user: registerData });
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
};

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/auth/verify');
    return resp.data;
  }
  return null;
};

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
};
