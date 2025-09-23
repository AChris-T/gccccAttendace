import { create } from 'zustand';
import { MemberService } from '../services/member.service';
import { handleApiError } from '../utils/error.helpers';
import { Toast } from '../lib/toastify';

export const useMemberStore = create((set, get) => ({
  // ====== STATE ======
  members: [],
  loading: false,
  loadingBulkUpdate: false,
  error: null,

  selectedMember: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await MemberService.getAllMembers();
      set({ members: data, loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  fetchMemberById: async (memberId) => {
    set({ loading: true, error: null });
    try {
      const response = await MemberService.getMemberById(memberId);
      set({ selectedMember: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  createMember: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await MemberService.createMember(payload);
      // Optimistic Update: Add to top of the list
      set({ members: [response.data, ...get().members] });
      return response.data;
    } catch (error) {
      set({ loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

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
      set({ loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  deleteMember: async (memberId) => {
    const previousMembers = get().members;
    set({
      members: previousMembers.filter((m) => m.id !== memberId),
      error: null,
    });

    try {
      await MemberService.deleteMember(memberId);
    } catch (error) {
      set({ members: previousMembers });
      set({ loading: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  bulkUpdate: async (payload) => {
    set({ loadingBulkUpdate: true });

    try {
      const data = await MemberService.bulkUpdate(payload);
      set({ loadingBulkUpdate: false });
      Toast.success(data?.message);
      get().fetchMembers();
    } catch (error) {
      set({ loadingBulkUpdate: false });
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  /** Reset store */
  resetMemberState: () =>
    set({
      members: [],
      selectedMember: null,
      loading: false,
      loadingBulkUpdate: false,
      error: null,
    }),
}));
