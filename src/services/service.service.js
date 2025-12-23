import $api from '../lib/axios';

const SERVICES = '/services';
export const ServiceService = {
  async getAllServices() {
    const { data } = await $api.get(`${SERVICES}`);
    return data;
  },
  async getTodaysService() {
    const { data } = await $api.get(`${SERVICES}/today-service`);
    return data;
  },
  async fetchCoreAppData() {
    const { data } = await $api.get(`${SERVICES}/core-app-data`);
    return data;
  },
};
