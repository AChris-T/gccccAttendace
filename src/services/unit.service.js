import $api from '../lib/axios';

const LEADERS_UNIT = '/leaders/units';

export const UnitService = {
  async getAllUnits() {
    const { data } = await $api.get(`${LEADERS_UNIT}`);
    return data;
  },
  async createUnit(payload) {
    const { data } = await $api.post(`${LEADERS_UNIT}`, payload);
    return data;
  },
  async updateUnit(payload) {
    const { data } = await $api.put(`${LEADERS_UNIT}/${payload.id}`, payload);
    return data;
  },
  async deleteUnit(id) {
    const { data } = await $api.delete(`${LEADERS_UNIT}/${id}`);
    return data;
  },
};
