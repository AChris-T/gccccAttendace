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
  async updateFirstTimer(payload) {
    const { data } = await $api.put(`/${FIRST_TIMER}/${payload.id}`, payload);
    return data;
  },
  async createFirstTimer(payload) {
    const { data } = await $api.post(`/${FIRST_TIMER}`, payload);
    return data;
  },

  async sendFirstTimerWelcomeEmail(payload) {
    const { data } = await $api.post(
      `/${FIRST_TIMER}/${payload.id}/welcome-email`,
      payload
    );
    return data;
  },

  storeFirstTimersFollowups: async (payload) => {
    const { data } = await $api.post(
      `/${FIRST_TIMER}/${payload.first_timer_id}/store-follow-ups`,
      payload
    );
    return data;
  },

  getFirstTimersFollowups: async (id) => {
    const { data } = await $api.get(`/${FIRST_TIMER}/${id}/get-follow-ups`);
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
