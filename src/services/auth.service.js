import $api from '../lib/axios';

export const AuthService = {
  async login(payload) {
    const { data } = await $api.post('/login', payload);
    return data;
  },

  async getMe() {
    const { data } = await $api.get('/me');
    return data;
  },

  async logout() {
    const { data } = await $api.post('/logout');
    return data;
  },
};
