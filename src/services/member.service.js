import $api from '../lib/axios';

const MEMBERS = 'members';
const ADMIN_MEMBERS = `/admin/${MEMBERS}`;

export const MemberService = {
  async getAllMembers(params = {}) {
    const queryParams = new URLSearchParams();

    params.date_of_birth?.forEach((date) =>
      queryParams.append('date_of_birth[]', date)
    );

    ['birth_month', 'community'].forEach((key) => {
      if (params[key]) queryParams.append(key, params[key]);
    });

    const query = queryParams.toString();
    const endpoint = `${MEMBERS}${query ? `?${query}` : ''}`;

    const { data } = await $api.get(endpoint);
    return data;
  },

  async fetchMembersByRole(role) {
    const { data } = await $api.get(`${ADMIN_MEMBERS}/role/${role}`);
    return data;
  },

  async getMemberById(memberId) {
    const { data } = await $api.get(`/${MEMBERS}/${memberId}`);
    return data;
  },

  async updateMember(payload) {
    const { data } = await $api.put(`/${MEMBERS}/${payload.id}`, payload);
    return data;
  },

  async createMember(payload) {
    const { data } = await $api.post(`/${MEMBERS}`, payload);
    return data;
  },
  async deleteMember(payload) {
    const { data } = await $api.post(`/${MEMBERS}/delete`, payload);
    return data;
  },
};
