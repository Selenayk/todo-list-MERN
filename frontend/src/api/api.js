import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username, email, password) =>
  api.post('/auth/register', { username, email, password });

export const getTodoLists = () => api.get('/todo/lists');
export const createTodoLists = (title, description) =>
  api.post('/todo/lists', { title, description });
