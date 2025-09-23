import $api from '../lib/axios';

export const FormService = {
  async form(payload) {
    const { data } = await $api.post(`/forms`, payload);
    return data;
  },

  //Fetch authenticated user attendance history
  /*  async getAttendanceHistory() {
    const { data } = await $api.get(`${ATTENDANCE}/history`);
    return data;
  },
  //Mark all absent users absent for a service
  async markAbsentees(payload) {
    const { data } = await $api.post(`${ATTENDANCE}/mark-absentees`, payload);
    return data;
  },
  async getAllAttendance() {
    const { data } = await $api.get(`${ATTENDANCE}`);
    return data;
  },
  */
};
