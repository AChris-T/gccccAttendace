import $api from '../lib/axios';

const ADMIN_UNIT = '/admin/units';

export const UnitService = {
  async getAllUnits() {
    const { data } = await $api.get(`${ADMIN_UNIT}`);
    return data;
  },
};
