import { create } from 'zustand';
import { MemberService } from '../services/member.service';
import { getErrorMessage } from '../utils/helper';

export const useMemberStore = create((set, get) => ({
  // ====== STATE ======
  members: [],
  pagination: null,
  loading: false,
  error: null,
  currentPage: 1,

  selectedMember: null,

  // ====== ACTIONS ======
  setPage: (page) => {
    set({ currentPage: page });
    get().fetchMembers(page);
  },
  /** Fetch paginated members */ //limit = get().limit
  fetchMembers: async (page = 1, limit = 50) => {
    set({ loading: true, error: null });
    try {
      const response = await MemberService.getAllMembers(page, limit); //limit
      const { data, meta, links } = response;

      set({
        members: data,
        pagination: { ...meta, links },
        currentPage: page,
      });

      return response;
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to fetch members');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Fetch a single member by ID */
  fetchMemberById: async (memberId) => {
    set({ loading: true, error: null });
    try {
      const response = await MemberService.getMemberById(memberId);
      set({ selectedMember: response.data });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to fetch member details');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Create a new member */
  createMember: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await MemberService.createMember(payload);
      // Optimistic Update: Add to top of the list
      set({ members: [response.data, ...get().members] });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to create member');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Update an existing member */
  updateMember: async (memberId, payload) => {
    set({ loading: true, error: null });
    try {
      const updatedMember = await MemberService.updateMember(memberId, payload);
      set({
        members: get().members.map((m) =>
          m.id === memberId ? updatedMember.data : m
        ),
      });
      return updatedMember.data;
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to update member');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /** Delete member with Optimistic Update */
  deleteMember: async (memberId) => {
    const previousMembers = get().members;
    // Optimistically update UI
    set({
      members: previousMembers.filter((m) => m.id !== memberId),
      error: null,
    });

    try {
      await MemberService.deleteMember(memberId);
    } catch (error) {
      // Rollback in case of failure
      set({ members: previousMembers });
      const message = getErrorMessage(error, 'Failed to delete member');
      set({ error: message });
      throw new Error(message);
    }
  },

  /** Reset store */
  resetMemberState: () =>
    set({
      members: [],
      selectedMember: null,
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: 0,
      lastPage: 1,
    }),
}));
