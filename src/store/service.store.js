import { create } from 'zustand';
import { ServiceService } from '../services/service.service';
import { handleApiError } from '../utils/error.helpers';

export const useServiceStore = create((set) => ({
  service: null,
  canMark: false,
  loading: true,
  error: false,

  fetchTodaysService: async () => {
    set({ loading: true, error: false });
    try {
      const {
        data: { service, can_mark },
      } = await ServiceService.getTodaysService();
      set({ service: service, canMark: can_mark });
    } catch (error) {
      set({ error: true, loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  resetService: () =>
    set({ service: null, canMark: false, loading: false, error: null }),
}));
