import $api from '../lib/axios';

const SERVICES = '/services';
export const ServiceService = {
  async getTodaysService() {
    const { data } = await $api.get(`${SERVICES}/today`);
    return data;
  },
};
