// src/services/firstTimer.service.js
import $api from '../lib/axios';

const FIRST_TIMER = '/first-timers';

export const FirstTimerService = {
  /** Fetch all first timers with optional pagination & filters */
  async getAll(params = {}) {
    const { data } = await $api.get(FIRST_TIMER, { params });
    return data;
  },

  async getAnalytics(params = {}) {
    const { data } = await $api.get(`${FIRST_TIMER}/analytics`, { params });
    return data;
  },

  /** Fetch a single first timer by ID */
  async getById(id) {
    const { data } = await $api.get(`${FIRST_TIMER}/${id}`);
    return data;
  },

  /** Create a new first timer record */
  async create(payload) {
    const { data } = await $api.post(FIRST_TIMER, payload);
    return data;
  },

  /** Update a first timer record */
  async update(id, payload) {
    const { data } = await $api.put(`${FIRST_TIMER}/${id}`, payload);
    return data;
  },

  /** Delete a first timer record */
  async delete(id) {
    const { data } = await $api.delete(`${FIRST_TIMER}/${id}`);
    return data;
  },
};
