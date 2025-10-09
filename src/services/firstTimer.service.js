import $api from '../lib/axios';

const FIRST_TIMER = 'first-timers';
const ADMIN = `/admin/${FIRST_TIMER}`;

export const FirstTimerService = {
  async getFirstTimers(params = {}) {
    const { data } = await $api.get(`/${FIRST_TIMER}`, { params });
    return data;
  },
  async fetchFirstTimer(id) {
    const { data } = await $api.get(`/${FIRST_TIMER}/${id}`);
    return data;
  },
  async updateFirstTimer({ id, payload }) {
    const { data } = await $api.put(`/${FIRST_TIMER}/${id}`, payload);
    return data;
  },
  async createFirstTimer(payload) {
    const { data } = await $api.post(`/${FIRST_TIMER}`, payload);
    return data;
  },

  getFirstTimersAssigned: async () => {
    const { data } = await $api.get('/first-timers/assigned');
    return data;
  },

  async getFirstTimersAnalytics(params) {
    const { data } = await $api.get(`${ADMIN}/analytics?year=${params?.year}`);
    return data;
  },
};
