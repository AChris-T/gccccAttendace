import $api from '../lib/axios';

const ATTENDANCE = '/attendance';
export const AttendanceService = {
  async markAttendance(payload) {
    const { data } = await $api.post(`${ATTENDANCE}/mark`, payload);
    return data;
  },
  //Fetch authenticated user attendance history
  async getAttendanceHistory() {
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
};
