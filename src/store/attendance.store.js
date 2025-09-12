import { create } from 'zustand';
import { AttendanceService } from '../services/attendance.service';

export const useAttendanceStore = create((set, get) => ({
  // State
  attendanceHistory: [],
  allAttendance: [],
  loading: false,

  selectedMonth: new Date().toLocaleString('default', { month: 'long' }),
  selectedYear: new Date().getFullYear(),

  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),

  filteredAttendanceHistory: () => {
    const { attendanceHistory, selectedMonth, selectedYear } = get();
    if (attendanceHistory.length === 0) return [];
    return attendanceHistory.filter((record) => {
      if (!record.attendance_date) return false;
      const recordDate = new Date(record.attendance_date);
      const recordMonth = recordDate.toLocaleString('default', {
        month: 'long',
      });
      const recordYear = recordDate.getFullYear();
      const matchesMonth =
        selectedMonth === 'All' || recordMonth === selectedMonth;
      const matchesYear = recordYear === selectedYear;
      return matchesMonth && matchesYear;
    });
  },

  /** Mark attendance for a single user */
  markAttendance: async (payload) => {
    set({ loading: true });
    try {
      const data = await AttendanceService.markAttendance(payload);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Something went wrong while marking attendance';
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Fetch authenticated user's attendance history */
  fetchAttendanceHistory: async () => {
    set({ loading: true });
    try {
      const { data } = await AttendanceService.getAttendanceHistory();
      set({ attendanceHistory: data || [], loading: false });
      return data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Something went wrong while marking attendance';
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Mark all absent users absent for a service */
  markAbsentees: async (payload) => {
    set({ loading: true });
    try {
      const response = await AttendanceService.markAbsentees(payload);
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  /** Fetch all attendance records */
  fetchAllAttendance: async () => {
    set({ loading: true });
    try {
      const response = await AttendanceService.getAllAttendance();
      set({ allAttendance: response.data || [], loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  /** Reset attendance state */
  resetAttendance: () =>
    set({ attendanceHistory: [], allAttendance: [], loading: false }),
}));
