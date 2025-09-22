import { create } from 'zustand';
import { AdminService } from '../services/admin.service';

export const useAdminStore = create((set, get) => ({
  loadingAdminAnalytics: false,
  loadingFirstTimersAnalytics: false,
  error: null,
  totalFirstTimers: [],
  integratedFirstTimers: [],
  statusesPerMonth: [],
  adminAnalytics: [],

  getFirstTimersAnalytics: async (params) => {
    set({ loadingFirstTimersAnalytics: true, error: null });
    try {
      const { data } = await AdminService.getFirstTimersAnalytics(params);
      set({
        totalFirstTimers: data.totalFirstTimers,
        integratedFirstTimers: data.integratedFirstTimers,
        statusesPerMonth: data.statusesPerMonth,
        loadingFirstTimersAnalytics: false,
      });
    } catch (error) {
      set({ loadingFirstTimersAnalytics: false });
      return error;
    }
  },

  getAdminAnalytics: async (params) => {
    set({ loadingAdminAnalytics: true, error: null });
    try {
      const { data } = await AdminService.getAdminAnalytics(params);
      set({ adminAnalytics: data });
    } catch (error) {
      return error;
    } finally {
      set({ loadingAdminAnalytics: false });
    }
  },

  /** Reset store */
  resetFirstTimerState: () =>
    set({
      loadingAdminAnalytics: false,
      loadingFirstTimersAnalytics: false,
      error: null,
      totalFirstTimers: [],
      integratedFirstTimers: [],
      statusesPerMonth: [],
    }),
}));
