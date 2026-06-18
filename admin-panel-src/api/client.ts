import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://rchub.023.az/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('rc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('rc_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default client;

// Auth
export const login = (email: string, password: string) =>
  client.post('/admin/login', { email, password });
export const getMe = () => client.get('/admin/me');
export const logout = () => client.post('/admin/logout');

// Generic CRUD
export const list = (resource: string, params?: any) =>
  client.get(`/admin/${resource}`, { params });
export const show = (resource: string, id: number) =>
  client.get(`/admin/${resource}/${id}`);
export const create = (resource: string, data: any) =>
  client.post(`/admin/${resource}`, data);
export const update = (resource: string, id: number, data: any) =>
  client.put(`/admin/${resource}/${id}`, data);
export const destroy = (resource: string, id: number) =>
  client.delete(`/admin/${resource}/${id}`);
export const upload = (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  return client.post('/admin/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const batchSettings = (data: Record<string, string>) =>
  client.post('/admin/settings/batch', data);

// Profile
export const updateProfile = (data: { name?: string; email?: string }) =>
  client.put('/admin/profile', data);
export const changePassword = (data: { current_password: string; new_password: string; new_password_confirmation: string }) =>
  client.put('/admin/password', data);
