import $api from '../lib/axios';

const MEMBERS = 'members';
const ADMIN_MEMBERS = `/admin/${MEMBERS}`;

export const MemberService = {
  async getAllMembers() {
    const { data } = await $api.get(`${MEMBERS}`);
    return data;
  },

  async fetchMembersByRole(role) {
    const { data } = await $api.get(`${ADMIN_MEMBERS}/role/${role}`);
    return data;
  },

  // async createMember(payload) {
  //   const { data } = await $api.post(`/${MEMBERS}`, payload);
  //   return data;
  // },

  // async getMemberById(memberId) {
  //   const { data } = await $api.get(`/${MEMBERS}/${memberId}`);
  //   return data;
  // },

  // async updateMember(memberId, payload) {
  //   const { data } = await $api.put(`/${MEMBERS}/${memberId}`, payload);
  //   return data;
  // },

  // async deleteMember(memberId) {
  //   const { data } = await $api.delete(`/${MEMBERS}/${memberId}`);
  //   return data;
  // },
};
