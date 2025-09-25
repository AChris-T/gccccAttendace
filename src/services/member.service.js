import $api from '../lib/axios';

const MEMBER = '/admin/members';

export const MemberService = {
  async createMember(payload) {
    const { data } = await $api.post(MEMBER, payload);
    return data;
  },

  async getAllMembers() {
    const { data } = await $api.get(`${MEMBER}`);
    return data;
  },

  async getMemberById(memberId) {
    const { data } = await $api.get(`${MEMBER}/${memberId}`);
    return data;
  },

  async updateMember(memberId, payload) {
    const { data } = await $api.put(`${MEMBER}/${memberId}`, payload);
    return data;
  },

  async deleteMember(memberId) {
    const { data } = await $api.delete(`${MEMBER}/${memberId}`);
    return data;
  },

  async bulkUpdate(payload) {
    const { data } = await $api.put(`${MEMBER}/bulk-update`, payload);
    return data;
  },
};
