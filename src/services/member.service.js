import $api from '../lib/axios';

const MEMBER = '/members';

export const MemberService = {
  /** Create a new member */
  async createMember(payload) {
    const { data } = await $api.post(MEMBER, payload);
    return data;
  },

  /** Fetch all members */
  async getAllMembers() {
    const { data } = await $api.get(MEMBER);
    return data;
  },

  /** Fetch a single member by ID */
  async getMemberById(memberId) {
    const { data } = await $api.get(`${MEMBER}/${memberId}`);
    return data;
  },

  /** Update a member by ID */
  async updateMember(memberId, payload) {
    const { data } = await $api.put(`${MEMBER}/${memberId}`, payload);
    return data;
  },

  /** Delete a member by ID */
  async deleteMember(memberId) {
    const { data } = await $api.delete(`${MEMBER}/${memberId}`);
    return data;
  },
};
