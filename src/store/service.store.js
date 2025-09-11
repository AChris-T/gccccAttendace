import { create } from 'zustand';
import { ServiceService } from '../services/service.service';

export const useServiceStore = create((set) => ({
  service: null,
  canMark: false,
  loading: true,
  error: false,
  message: null,

  fetchTodaysService: async () => {
    set({ loading: true, error: false, message: null });
    try {
      const { data } = await ServiceService.getTodaysService();
      set({
        service: data?.service || null,
        canMark: data?.can_mark || false,
        message: 'success',
      });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error, Please try later';
      set({ error: true, message });
    } finally {
      set({ loading: false });
    }
  },

  resetService: () =>
    set({ service: null, canMark: false, loading: false, error: null }),
}));
