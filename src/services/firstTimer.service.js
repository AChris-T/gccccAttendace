import $api from '../lib/axios';

const FIRST_TIMER = '/first-timers';
const ADMIN = `/admin/first-timers`;

export const FirstTimerService = {
  async getFirstTimers(params = {}) {
    const { data } = await $api.get(FIRST_TIMER, { params });
    return data;
  },

  async createFirstTimer(payload) {
    const { data } = await $api.post(FIRST_TIMER, payload);
    return data;
  },

  async getFirstTimersAnalytics(params) {
    const { data } = await $api.get(`${ADMIN}/analytics?year=${params?.year}`);
    return data;
  },
};
