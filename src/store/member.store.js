import { create } from 'zustand';
import { MemberService } from '../services/member.service';

export const useMemberStore = create((set, get) => ({
  // ====== STATE ======
  members: [],
  selectedMember: null, // For view/edit modals
  loading: false,
  error: null,

  // ====== ACTIONS ======
  setSelectedMember: (member) => set({ selectedMember: member }),
  clearSelectedMember: () => set({ selectedMember: null }),

  /** Fetch all members */
  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await MemberService.getAllMembers();
      set({ members: data || [], loading: false });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch members';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  /** Fetch a single member */
  fetchMemberById: async (memberId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await MemberService.getMemberById(memberId);
      set({ selectedMember: data, loading: false });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch member details';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  /** Create a new member */
  createMember: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await MemberService.createMember(payload);
      set({ members: [data, ...get().members], loading: false });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to create member';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  /** Update member */
  updateMember: async (memberId, payload) => {
    set({ loading: true, error: null });
    try {
      const updatedMember = await MemberService.updateMember(memberId, payload);
      set({
        members: get().members.map((m) =>
          m.id === memberId ? updatedMember : m
        ),
        loading: false,
      });
      return updatedMember;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update member';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  /** Delete member */
  deleteMember: async (memberId) => {
    set({ loading: true, error: null });
    try {
      await MemberService.deleteMember(memberId);
      set({
        members: get().members.filter((m) => m.id !== memberId),
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to delete member';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  /** Reset member state */
  resetMemberState: () =>
    set({ members: [], selectedMember: null, loading: false, error: null }),
}));
