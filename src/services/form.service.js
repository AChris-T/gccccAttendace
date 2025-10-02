import $api from '../lib/axios';

export const FormService = {
  async createFormMessages(payload) {
    const { data } = await $api.post(`/forms`, payload);
    return data;
  },
  async getFormMessages(params = {}) {
    const { data } = await $api.get('/admin/forms', { params });
    return data;
  },
};
