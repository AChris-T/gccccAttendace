import { create } from 'zustand';
import { FirstTimerService } from '../services/firstTimer.service';

export const useFirstTimerStore = create((set, get) => ({
  /** State */
  firstTimers: [],
  loading: false,
  error: null,
  selectedFirstTimer: null,

  fetchFirstTimers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await FirstTimerService.getAll();
      set({
        firstTimers: data || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch first timers',
      });
    }
  },

  /** Fetch single first timer details */
  fetchFirstTimerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await FirstTimerService.getById(id);
      set({ selectedFirstTimer: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          'Failed to fetch first timer details',
      });
    }
  },

createFirstTimer: async (payload) => {
  set({ loading: true, error: null });
  try {
    const response = await FirstTimerService.create(payload);
    return response;  // ✅ return it so FirstTimerPage can use it
  } catch (error) {
    set({
      error:
        error.response?.data?.message ||
        'Failed to create first timer record',
    });
    return { error: error.response?.data?.message || 'Failed to create first timer record' }; // ✅ also return error
  } finally {
    set({ loading: false });
  }
},


  /** Update a first timer record */
  updateFirstTimer: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await FirstTimerService.update(id, payload);
      await get().fetchFirstTimers(); // refresh list
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          'Failed to update first timer record',
      });
    } finally {
      set({ loading: false });
    }
  },

  /** Delete a first timer record */
  deleteFirstTimer: async (id) => {
    set({ loading: true, error: null });
    try {
      await FirstTimerService.delete(id);
      await get().fetchFirstTimers(); // refresh list
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          'Failed to delete first timer record',
      });
    } finally {
      set({ loading: false });
    }
  },

  /** Pagination Handler */
  setPage: async (page) => {
    await get().fetchFirstTimers({ page });
  },

  /** Reset store */
  resetFirstTimerState: () =>
    set({
      firstTimers: [],
      selectedFirstTimer: null,
      loading: false,
      error: null,
    }),
}));
