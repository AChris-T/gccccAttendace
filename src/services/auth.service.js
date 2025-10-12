import $api from '../lib/axios';

export const AuthService = {
  async login(payload) {
    const { data } = await $api.post('/login', payload);
    return data;
  },

  async register(payload) {
    const { data } = await $api.post('/register', payload);
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

  // authenticated user
  uploadAvatar: async (id, file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await $api.post(`/users/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
