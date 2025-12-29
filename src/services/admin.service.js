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
  async fetchFromYouTube() {
    const { data } = await $api.post(`${ADMIN}/media/fetch`);
    return data;
  },
  async assignRoleToUsers(payload) {
    const { data } = await $api.post(`${ADMIN}/assign-role`, payload);
    return data;
  },
  async syncUsersPermissions(payload) {
    const { data } = await $api.post(`${ADMIN}/sync-permissions`, payload);
    return data;
  },
};
