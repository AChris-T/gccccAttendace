import $api from '../lib/axios';

const SOD_EVENT = 'event-registrations';
const SOD_ADMIN_EVENT = 'admin/event-registrations';

export const EventService = {
  async createEvent(payload) {
    const { data } = await $api.post(`/${SOD_EVENT}`, payload);
    return data;
  },

  async getEvent(params) {
    const { data } = await $api.get(`/${SOD_EVENT}?event=${params?.event}`);
    return data;
  },
  async getAllEvents() {
    const { data } = await $api.get(`/${SOD_ADMIN_EVENT}`);
    return data;
  },
  async updateEvent(payload) {
    const { data } = await $api.put(`/${SOD_EVENT}/${payload.id}`, payload);
    return data;
  },
};
