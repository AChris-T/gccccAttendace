import { create } from 'zustand';
import { FirstTimerService } from '../services/firstTimer.service';

export const useFirstTimerStore = create((set, get) => ({
  /** State */
  firstTimers: [],
  pagination: {
    current_page: 1,
    total: 0,
    per_page: 10,
    from: 0,
    to: 0,
    links: [],
  },
  loading: false,
  error: null,
  selectedFirstTimer: null,
  total_first_timers: [],
  integrated_first_timers: [],

  /** Fetch all first timers with optional pagination and filters */
  getAnalytics: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await FirstTimerService.getAnalytics(params);
      set({
        total_first_timers: data.total_first_timers,
        integrated_first_timers: data.integrated_first_timers,
        loading: false,
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  fetchFirstTimers: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await FirstTimerService.getAll({
        page: params.page || get().pagination.current_page,
        per_page: params.per_page || get().pagination.per_page,
        ...params,
      });

      set({
        firstTimers: response?.data || [],
        pagination: {
          current_page: response?.current_page,
          total: response?.total,
          per_page: response?.per_page,
          from: response?.from,
          to: response?.to,
          links: response?.links || [],
        },
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
      pagination: {
        current_page: 1,
        total: 0,
        per_page: 10,
        from: 0,
        to: 0,
        links: [],
      },
      selectedFirstTimer: null,
      loading: false,
      error: null,
    }),
}));
