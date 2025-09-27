import $api from '../lib/axios';

const ADMIN = '/admin';
export const AdminService = {
  async getAdminAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const { data } = await $api.get(
      `${ADMIN}/analytics${queryString ? `?${queryString}` : ''}`
    );
    return data;
  },
};
