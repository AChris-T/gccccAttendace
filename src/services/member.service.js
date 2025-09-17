import $api from '../lib/axios';

const MEMBER = '/members';

export const MemberService = {
  /** Create a new member */
  async createMember(payload) {
    const { data } = await $api.post(MEMBER, payload);
    return data;
  },

  /** Fetch members with pagination */
  async getAllMembers(page, limit) {
    const { data } = await $api.get(`${MEMBER}?page=${page}&per_page=${limit}`);
    return data;
  },

  /** Fetch a single member by ID */
  async getMemberById(memberId) {
    const { data } = await $api.get(`${MEMBER}/${memberId}`);
    return data;
  },

  /** Update member */
  async updateMember(memberId, payload) {
    const { data } = await $api.put(`${MEMBER}/${memberId}`, payload);
    return data;
  },

  /** Delete member */
  async deleteMember(memberId) {
    const { data } = await $api.delete(`${MEMBER}/${memberId}`);
    return data;
  },
};
