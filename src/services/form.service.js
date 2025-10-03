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
  async updateFormMessages(payload) {
    const { data } = await $api.patch('/admin/forms/completed', payload);
    return data;
  },
  async deleteFormMessages(ids) {
    const { data } = await $api.delete('/admin/forms', { data: ids });
    return data;
  },
};
