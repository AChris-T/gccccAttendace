import $api from '../lib/axios';

const SOD_EVENT = 'sod-events';

export const EventService = {
  async createEvent(payload) {
    const { data } = await $api.post(`/${SOD_EVENT}`, payload);
    return data;
  },

  async getEventById(eventId) {
    const { data } = await $api.get(`/${SOD_EVENT}/${eventId}`);
    return data;
  },

  async updateEvent(payload) {
    const { data } = await $api.put(`/${SOD_EVENT}/${payload.id}`, payload);
    return data;
  },
};
