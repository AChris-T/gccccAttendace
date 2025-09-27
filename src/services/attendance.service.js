import $api from '../lib/axios';

export const AttendanceService = {
  async markAttendance(payload) {
    const { data } = await $api.post(`/attendance/mark`, payload);
    return data;
  },
  async getAttendanceHistory() {
    const { data } = await $api.get(`/attendance/history`);
    return data;
  },
  async markAbsentees(payload) {
    const { data } = await $api.post(`/attendance/mark-absentees`, payload);
    return data;
  },
  // admin
  async getAllAttendance() {
    const { data } = await $api.get(`/admin/attendance`);
    return data;
  },
  //  Get monthly attendance statistics (average or total). for usher attendance
  async getAdminAttendanceMonthlyStats(year, mode) {
    const { data } = await $api.get(
      `/admin/attendance/monthly-stats?year=${year}&mode=${mode}`
    );
    return data;
  },
};
