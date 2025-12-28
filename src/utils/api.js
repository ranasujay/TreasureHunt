import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (name, password) => {
    const response = await api.post('/users/login', { name, password });
    return response.data;
  },
  
  register: async (name, password) => {
    const response = await api.post('/admin/register', { name, password });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/levels/current');
    return response.data;
  },
};

export const levelAPI = {
  checkAccess: async (level) => {
    const response = await api.get(`/levels/check/${level}`);
    return response.data;
  },
  
  submitAnswer: async (nextLevel, answer) => {
    const response = await api.post(`/checker/check/${nextLevel}`, { ans: answer });
    return response.data;
  },
};

export const leaderboardAPI = {
  getLeaderboard: async () => {
    const response = await api.get('/admin/leaderboard');
    return response.data;
  },
};

export default api;
