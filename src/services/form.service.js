import $api from '../lib/axios';

export const FormService = {
  async createForm(payload) {
    const { data } = await $api.post(`/forms`, payload);
    return data;
  },
};
